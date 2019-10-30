const ul = document.querySelector('ul');
const input = document.querySelector('input');

// Populate with existing chat messages
db.collection('disco').get()
    .then(snapshot => {
        snapshot.forEach(chat => {
            let li = document.createElement('li');
            li.innerHTML = `${chat.data().text}`;
            ul.appendChild(li);    
            // console.log(ul.innerHTML + li);
        })
    });

// Add a new message to the db
window.addEventListener('keydown', e => {
    if(e.keyCode === 13 && input.value){
        e.preventDefault();
        db.collection('disco').add({text: input.value});
        input.value = "";
    }
})
