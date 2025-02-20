const io = require("socket.io-client");

const socket = io("http://localhost:4000", {
  query: {
    userId: 2,
    name: "Dilnura"
  }
}); // Serveringiz URL'ini yozing

socket.on("connect", () => {
  console.log("Dilnura aloqada!");
});
socket.on("sendMessage", ctx => console.log(ctx))