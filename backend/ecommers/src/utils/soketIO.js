const { Server } = require('socket.io');


const connectChat = () => {
    const io = new Server({
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.emit("welcome", "Welcome to fruitables" )
        socket.broadcast.emit("greeting","hello all")

        socket.on("message", (data) => {
            console.log(data);

            io.to(data.receiver).emit('receive-message',data.message)
        })

        socket.on('join-group',(group_name) => {
            socket.join(group_name)
        })
    });

    io.listen(8080)

}

module.exports = connectChat

// PV24NK6D5BALUDJY82SV9994