BuildList()
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for(let i=0; i< cookies.length; i++){
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
var activeItem = null;
var list_snapshot = [];

function BuildList(){
    var wrapper = document.getElementById('list-wrapper')
    var url = 'http://localhost:8000/api/task-list/'
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        var list = data
        for(let i in list){
            try {
                document.getElementById(`task-wrapper-${i}`).remove()
            } catch (error) {

            }


            var title = `<span class='title'>${list[i].title}</span>`

            if (list[i].complete == true){
                title = `<strike class='title text-black-50'>${list[i].title}</strike>`
            }

            var item = `
                <div id="task-wrapper-${i}" class="container bg-light p-0 m-0">
                    <div class="d-flex justify-content-between border-bottom px-3 py-2">
                        <div class="pt-2">
                            ${title}
                        </div>
                        <div>
                            <button class="btn btn-outline-info edit">Edit</button>
                            <button class="btn btn-outline-danger delete">Del</button>
                        </div>
                    </div>
                </div>
            `
            wrapper.innerHTML += item
        }

        if (list_snapshot.length > list.length){
            for(let i=list.length; i< list_snapshot.length; i++){
                document.getElementById(`task-wrapper-${i}`).remove()
            }
        }
        
        list_snapshot = list

        for(let i in list){
            var editBtn = document.getElementsByClassName('edit')[i]
            var deleteBtn = document.getElementsByClassName('delete')[i]
            var title = document.getElementsByClassName('title')[i]

            editBtn.addEventListener('click', function(item){
                return function(){
                    editItem(item)
                };
            }(list[i]));

            deleteBtn.addEventListener('click', function(item){
                return function(){
                    deleteItem(item)
                };
            }(list[i]));

            title.addEventListener('click', function(item){
                return function(){
                    strokeUnstroke(item)
                };
            }(list[i]));
        }
    })
}


var form = document.getElementById('form-wrapper')

form.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('hello');
    var url = 'http://localhost:8000/api/task-create/'
    var title = document.getElementById('title').value

    if(activeItem != null){
        var url =  `http://localhost:8000/api/task-update/${activeItem.id}/`
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'title':title})
    })
    .then(res => res.json())
    .then(data => {
        console.log('Data:', data);
        BuildList()
        document.getElementById('form').reset()
    })
})

function editItem(item){
    activeItem = item
    document.getElementById('title').value = activeItem.title
}

function deleteItem(item){

    fetch(`http://localhost:8000/api/task-delete/${item.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'title': item.title})
    })
    .then(data => {
        BuildList()
    })
}

function strokeUnstroke(item){
    console.log('Stroke:', item);
    item.complete = !item.complete

    fetch(`http://localhost:8000/api/task-update/${item.id}/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'title': item.title, 'complete': item.complete})
    })
    .then(data => {
        BuildList()
    })
}