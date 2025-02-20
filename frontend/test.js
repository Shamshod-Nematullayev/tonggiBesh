const io = require("socket.io-client");

const socket = io("http://localhost:4000", {
  query: {
    userId: 1,
    name: "Shamshod"
  }
}); // Serveringiz URL'ini yozing

socket.on("connect", () => {
  console.log("Serverga ulandi!");
  socket.emit("sendMessage", { message: "Hi, from user 1", id: 2 }); // O'zingizning eventingizni yuboring
});