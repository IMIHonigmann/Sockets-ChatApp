
const socket = io('ws://localhost:8080');

let room;

socket.on('message', text => {
    const el = document.createElement('li');
    console.log("client:"+text);
    if(text.startsWith("<connected>")) {
        el.className = "connected";
    }
    else if(text.startsWith("<message>")) {
        el.className = "messages";
    }
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)
});

socket.on('connect', () => {
    room = socket.id;
    document.getElementById('idlookupfield').textContent = `The current Room ID is: ${socket.id}`;
    console.log('Connected!');
    socket.emit('message', '<connected> ' + socket.id);
});

document.getElementById('sendtext').onclick = () => {
    const text = document.getElementById('messageinput').value;
    socket.emit('message', '<message>' + text, room);
}

document.getElementById('joinroom').onclick = () => {
    if(document.getElementById('roominput').value === "") return
    room = document.getElementById('roominput').value;
    socket.emit('joinRoom', room, cbmessage => {
        const li = document.createElement('li');
        li.textContent = cbmessage;
        li.classList.add('connected');
        document.querySelector('ul').appendChild(li);
        document.getElementById('idlookupfield').textContent = cbmessage;
    });
}