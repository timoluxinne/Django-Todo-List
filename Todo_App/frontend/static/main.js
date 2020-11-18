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
                <div id='task-wrapper' class='d-flex justify-content-between'>
                    <span>${list[i].title}</span>
                    <div>
                        <button class='btn btn-outline-info'>Edit</button>
                        <button class='btn btn-outline-danger'>Del</button>
                    </div>
                </div>
            `
            wrapper.innerHTML += item
        }
    })
}