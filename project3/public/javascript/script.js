const socket = io("/chatting");

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById("hello_stranger");
const chattingBoxElement = getElementById("chatting_box");
const formElement = getElementById("chat_form");

const drawHelloStranger = (userName) => {
  helloStrangerElement.innerText = `Hello, ${userName}`;
};

function helloUser() {
  const userName = prompt("What is your name?");

  socket.emit("new_user", userName, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  socket.on("user_connected", (data) => {
    console.log(`${data} is connected`);
  });

  helloUser();
}

init();
