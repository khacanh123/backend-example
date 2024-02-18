import { Server } from "socket.io";

const io = new Server({cors: "http://localhost:3000"});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection",socket.id);

    //   listen to a connection
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
        
        console.log("onlineUsers", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    })

    // add messsage
    socket.on("sendMessage", (message) => {
        console.log('message', message);
        const user = onlineUsers.find(user => user.userId === message.recipientId);
        console.log('onlineUsers', onlineUsers);
        console.log('user', user);
        if(user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(3002);