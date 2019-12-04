const ul = document.querySelector('ul');
const input = document.querySelector('input');

const newChat = chat => {
    let li = document.createElement('li');
    let chatTime = chat.timestamp.toDate();
    let formattedTime = dateFns.distanceInWords(new Date, chatTime);
    li.innerHTML = `${chat.text}
                    <p>-- ${chat.author} ${formattedTime} ago`
    ul.appendChild(li);     // Problem with new chats being loaded in wrong order probably comes from here
}

// Populate with existing chat messages
// db.collection('disco').orderBy('timestamp').get()
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
db.collection('disco').orderBy('timestamp').onSnapshot(chats => {
    chats.docChanges().forEach(chat => {
        if(chat.type === "added"){
            newChat(chat.doc.data());
        }
    })
});    