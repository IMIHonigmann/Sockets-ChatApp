const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
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

const PORT = 8080;
server.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));