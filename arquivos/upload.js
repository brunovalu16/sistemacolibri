
const storage = firebase.storage();

const input = document.querySelector('input[type=file]');

input.addEventListener('change', (e)=>{
    let file = e.target.files[0];

    const uploadTask = storage.ref('images/${e.target.files[0].name}')
    .put(e.target.files[0]);

    uploadTask.on("state_changed", function(snapshot){
        let progress = (snapshot.byTransferred/snapshot.totalBytes) * 1;

        document.querySelector('progress').value = progress;

    },function(error){},function(){
        console.log('upload realizado com sucesso!');
    })
});