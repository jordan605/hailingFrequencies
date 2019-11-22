const ul = document.querySelector('ul');
const input = document.querySelector('input');

// Populate with existing chat messages
db.collection('disco').get()
    .then(snapshot => {
        snapshot.forEach(chat => {
            console.log(snapshot);
            let li = document.createElement('li');
            li.innerHTML = `${chat.data().text}`;
            ul.appendChild(li);
            console.log(ul.innerHTML + li);
        })
    });

// Add a new message to the db
window.addEventListener('keydown', e => {
    if(e.keyCode === 13 && input.value){
        e.preventDefault();
        console.log(input.value);
        db.collection('disco').add({text: input.value});
        input.value = "";
    }
});

db.collection('disco').onSnapshot(snapshot => {
    console.log(snapshot);
    snapshot.docChanges().forEach(change => {
        if(change.type === "added"){
            console.log(change.doc);
            console.log(change.doc.fields);

        }
    });
});