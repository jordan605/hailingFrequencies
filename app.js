const ul = document.querySelector('ul');
const input = document.querySelector('input');
const transmitter = document.querySelector('#transmitter');
let author = "";

localStorage ? author = localStorage.username : author = "Some Red Shirt";  // If no stored name, establishes default
transmitter.textContent = author;

const newChat = chat => {
    let li = document.createElement('li');
    let chatTime = chat.timestamp.toDate();                             // Converts Firebase Timestamp to actual time
    let formattedTime = dateFns.distanceInWords(new Date, chatTime);    // Converts actual time to "10 minutes ago" etc
    li.innerHTML = `${chat.text}
                    <p>-- ${chat.author} ${formattedTime} ago`
    ul.appendChild(li);
}

// Populate with existing chat messages
// db.collection('disco').orderBy('timestamp').get()
//     .then(snapshot => snapshot.forEach(chat => newChat(chat.data().text)));

// Add a new message to the db
window.addEventListener('keydown', e => {
    if(e.keyCode === 13 && input.value){
        e.preventDefault();
        const now = new Date();
        db.collection('disco').add({author: author,
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