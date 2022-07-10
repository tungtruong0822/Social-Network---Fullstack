let users = [];

export const socketServer = (socket) => {
  socket.on("joinUser", (id) => {
    users.push({ id, socketId: socket.id });
    console.log(users);
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    console.log(users);
  });
  socket.on("likeAndUnlike", (newpost) => {
    const clients = users.map((user) => user.socketId);
    socket.to(clients).emit("likeToClient", newpost);
  });
  socket.on("createMessage", (newMsg) => {
    let clients = [];
    newMsg.totalUser.forEach((userClient) => {
      users.forEach((userSocket) => {
        if (userClient._id === userSocket.id) {
          clients.push(userSocket.socketId);
        }
      });
    });

    console.log(clients);
    socket.to(clients).emit("createMessageToClient", newMsg);
  });
};
