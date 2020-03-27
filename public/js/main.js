console.log("main")
const socket = io()

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})
console.log(username, room)

// join the user to the respective room
socket.emit("joinRoom", { username, room })

// get the all users of respective room
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room)
  outputUsersName(users)
})

const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector(".chat-messages")

socket.on("message", data => {
  console.log(data)
  outputmsg(data)
  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener("submit", e => {
  e.preventDefault()

  const msg = e.target.elements.msg.value

  console.log(msg)
  socket.emit("chatMessage", msg)

  e.target.elements.msg.value = ""
  e.target.elements.msg.focus()
})

// messages output to DOM

function outputmsg(msg) {
  const div = document.createElement("div")
  console.log(msg)
  div.classList.add("message")
  div.innerHTML = ` <p class="meta">${msg.username} <span>${msg.time}</span></p>
   <p class="text">
    ${msg.text}
   </p>`
  console.log(msg.text)
  document.querySelector(".chat-messages").appendChild(div)
}

// display room name on sidebar
function outputRoomName(room) {
  const roomName = document.getElementById("room-name")
  roomName.innerText = room
}

function outputUsersName(users) {
  const usersList = document.getElementById("users")
  usersList.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join("")}
`
}
