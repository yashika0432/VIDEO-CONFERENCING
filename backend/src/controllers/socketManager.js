import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }
      if (messages[path] !== undefined) {
        for (let a = 0; a < connections[path].length; a++) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["sender-id-sender"]
          );
        }
      }
    });
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });
    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isfound], [roomkey, roomvalue]) => {
          if (!isfound && roomvalue.includes(socket.id)) {
            return [roomkey, true];
          }
          return [room, isfound];
        },
        ["", false]
      );
      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }
        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "sender-id-sender": socket.id,
        });
        console.log("messages", key, sender, data);

        connections[matchingRoom].forEach((id) => {
          io.to(id).emit("chat-message", data, sender, socket.id);
        });
      }
    });
    socket.on("disconnect", () => {
      var diffTime = Math.abs(new Date() - timeOnline[socket.id]);
      var key;
      for (const [k, v] of JSON.parse(JSON.stringify(connections))) {
        for (let a = 0; a < v.length; a++) {
          if (v[a] === socket.id) {
            key = k;
            for (let b = 0; b < connections[key].length; b++) {
              io.to(connections[key][b]).emit("user-disconnected", socket.id);
            }
            var index = connections[key].indexOf(socket.id);
            connections[key].splice(index, 1);

            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });
  return io;
};

export default connectToSocket;
