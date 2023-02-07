const socket = io("/chatting");

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById("hello_stranger");
const chattingBoxElement = getElementById("chatting_box");
const formElement = getElementById("chat_form");

function helloUser() {
  const userName = prompt("What is your name?");

  socket.emit("new_user", userName);

  socket.on("hello_user", (data) => console.log(data));
}

function init() {
  helloUser();
}

init();
