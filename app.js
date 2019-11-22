const ul = document.querySelector('ul');
const input = document.querySelector('input');

const newChat = chat => {
    console.log(chat)
    let li = document.createElement('li');
    // li.innerHTML = `${chat.timestamp.toDate()} ${chat.author} says: ${chat.text}`;
    li.innerHTML = `${chat.text}
                    <p>-- ${chat.author} at ${chat.timestamp.toDate()}`
    ul.appendChild(li);     // Problem with new chats being loaded in wrong order probably comes from here
}

// Populate with existing chat messages
// db.collection('disco').get()
//     .then(snapshot => snapshot.forEach(chat => newChat(chat.data().text)));

// Add a new message to the db
window.addEventListener('keydown', e => {
    if(e.keyCode === 13 && input.value){
        e.preventDefault();
        const now = new Date();
        db.collection('disco').add({author: "Anonymous",
                                    text: input.value,
                                    timestamp: firebase.firestore.Timestamp.fromDate(now)
                                });
        input.value = "";
    }
});

// Adding new chats to the bottom of the window
db.collection('disco').onSnapshot(chats => {
    chats.docChanges().forEach(chat => {
        if(chat.type === "added"){
            newChat(chat.doc.data());
        }
    })
});    