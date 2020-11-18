// console.log('====================================');
// console.log('Youh');
// console.log('====================================');
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

function BuildList(){
    console.log('Youh');
    var wrapper = document.getElementById('list-wrapper')
    wrapper.innerHTML = '';
    var url = 'http://localhost:8000/api/task-list/'
    var activeItem = null;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log('Data:',data)
        
        var list = data
        for(let i=0; i< list.length; i++){
            // console.log(i);
            var item = `
                <div id="list-wrapper" class="container bg-light p-0 m-0">
                    <div class="d-flex justify-content-between border-bottom px-3 py-2">
                        <div class="pt-2">
                            <span>${list[i].title}</span>
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

        for(let i=0; i< list.length; i++){
            var editBtn = document.getElementsByClassName('edit')[i]
            var deleteBtn = document.getElementsByClassName('delete')[i]


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
    console.log('Item:', item);

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