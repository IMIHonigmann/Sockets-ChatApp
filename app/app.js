
const socket = io('ws://localhost:8080');

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
    console.log('Connected!');
    socket.emit('message', '<connected> ' + socket.id);
});

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message', '<message>' + text);
}