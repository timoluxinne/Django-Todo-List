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
    })
}