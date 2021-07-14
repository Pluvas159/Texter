const io = require('socket.io')(5001, {
    cors: {
        origin: "*"
    }
})

io.on('connection', socket =>{

    socket.on("join-room", room =>{
        if(room!==''){
            socket.join(room)
        }
    })

    socket.on("send-msg", (message, room) => {
        console.log(message)
        socket.to(room).emit('recv-msg', message)
    })

    socket.on("leave-room", room => {
        if(room!==''){
            socket.leave(room)
        }
    })

})
