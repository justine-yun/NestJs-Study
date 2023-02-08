const socket = io("/chatting");

const getElementById = (id) => document.getElementById(id) || null;

// element
const helloStrangerElement = getElementById("hello_stranger");
const chattingBoxElement = getElementById("chatting_box");
const formElement = getElementById("chat_form");

// draw function
const drawHelloStranger = (userName) => {
  helloStrangerElement.innerText = `Hello, ${userName}`;
};
const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement("div");
  const chatBox = `<div>
    ${message}
  </div>`;

  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

const handleSubmit = (event) => {
  event.preventDefault();

  const inputValue = event.target.elements[0].value;

  if (inputValue !== "") {
    socket.emit("submit_chat", inputValue);

    drawNewChat(`> ${inputValue}`);

    event.target.elements[0].value = "";
  }
};

function helloUser() {
  const userName = prompt("What is your name?");

  socket.emit("new_user", userName, (data) => {
    drawHelloStranger(data);
  });
}

// global socket
socket.on("user_connected", (data) => {
  drawNewChat(`※ ${data} is connected`);
});
socket.on("new_chat", (data) => {
  const { chat, userName } = data;

  drawNewChat(`${userName}: ${chat}`);
});

function init() {
  formElement.addEventListener("submit", handleSubmit);

  helloUser();
}

init();
