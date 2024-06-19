
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    // console.log(socket.id + ' connected');

    socket.on('joinRoom', (data, cb) => {
        console.log('User joined in ' + data);
        socket.join(data);
        cb(`You have joined the room: ${data}`);
    });
    
    socket.on('message', (message, room) => {
        console.log("server:" + message);
        if(message.startsWith("<connected>")) {
            io.to(room).emit('message', `${message} connected and ready`);
        }
        else if(message.startsWith("<message>")) {
            message = message.replace("<message>", "")
            io.to(room).emit('message', `<message>${socket.id.substr(0,2)} said ${message}`);
        }
        
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );