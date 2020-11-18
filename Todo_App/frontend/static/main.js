console.log('====================================');
console.log('Youh');
console.log('====================================');
BuildList()

function BuildList(){
    console.log('Youh');
    var wrapper = document.getElementById('list-wrapper')
    var url = 'http://localhost:8000/api/task-list/'

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log('Data:',data)
        
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
                            <button class="btn btn-outline-info">Edit</button>
                            <button class="btn btn-outline-danger">Del</button>
                        </div>
                    </div>
                </div>
            `
            wrapper.innerHTML += item
        }
    })
}