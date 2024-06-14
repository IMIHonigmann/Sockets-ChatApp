
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    // console.log(socket.id + ' connected');
    
    socket.on('message', (message) => {
        console.log("server:" + message);
        if(message.startsWith("<connected>")) {
            io.emit('message', `${message} connected and ready`);
        }
        else if(message.startsWith("<message>")) {
            message = message.replace("<message>", "")
            io.emit('message', `<message>${socket.id.substr(0,2)} said ${message}`);
        }
        
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );