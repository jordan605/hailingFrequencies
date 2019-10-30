const ul = document.querySelector('ul');

// Populate with existing chat messages
db.collection('disco').get()
    .then(snapshot => {
        snapshot.forEach(chat => {
            console.log(chat.data());
            let li = document.createElement('li');
            li.innerHTML = `${chat.data().text}     Sent at: `;
            ul.appendChild(li);    
        })
    });

// Add a new message to the db

window.addEventListener('keydown', e=> {
    if(e.keyCode === 13){
        console.log("YEAH");
    }
})
// db.collection('disco').add()