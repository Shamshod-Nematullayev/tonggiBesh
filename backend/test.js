const io = require("socket.io-client");

const socket = io("http://localhost:4000"); // Serveringiz URL'ini yozing

socket.on("connect", () => {
  console.log("Serverga ulandi!");
  socket.emit("myEvent", { message: "Salom, server!" }); // O'zingizning eventingizni yuboring
});