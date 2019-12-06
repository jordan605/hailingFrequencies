const ul = document.querySelector('ul');
const chat = document.querySelector('#chat');
const transmitter = document.querySelector('#transmitter');
const updateNameBtn = document.querySelector("#updateNameBtn");
const nameChange = document.querySelector("#namechange");

// Name
let author = "";
localStorage ? author = localStorage.username : author = "Some Red Shirt";  // If no stored name, establishes default
transmitter.textContent = author;
updateNameBtn.addEventListener('click', (e) => {
    
});

const newChat = chat => {
    let li = document.createElement('li');
    let chatTime = chat.timestamp.toDate();                             // Converts Firebase Timestamp to actual time
    let formattedTime = dateFns.distanceInWords(new Date, chatTime);    // Converts actual time to "10 minutes ago" etc
    li.innerHTML = `${chat.text}
                    <p>-- ${chat.author} ${formattedTime} ago`
    ul.appendChild(li);
}

// Add a new message to the db
window.addEventListener('keydown', e => {
    if(e.keyCode === 13 && chat.value){
        e.preventDefault();
        const now = new Date();
        db.collection('disco').add({author: author,
                                    text: chat.value,
                                    timestamp: firebase.firestore.Timestamp.fromDate(now)
                                });
        chat.value = "";
    }
    else if(e.keyCode === 13 && nameChange.value){
        localStorage.setItem("username", nameChange.value);
        nameChange.value = "";
    }
});

// Adding  chats to the window
db.collection('disco').orderBy('timestamp').onSnapshot(chats => {
    chats.docChanges().forEach(chat => {
        if(chat.type === "added"){
            newChat(chat.doc.data());
        }
    })
});    



// Populate with existing chat messages
// db.collection('disco').orderBy('timestamp').get()
//     .then(snapshot => snapshot.forEach(chat => newChat(chat.data().text)));