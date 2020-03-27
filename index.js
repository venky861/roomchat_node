const express = require("express")
const app = express()
const path = require("path")
const http = require("http")
const socketio = require("socket.io")
const { formatmessages } = require("./utilities/messages")
const {
  userJoin,
  currentUser,
  userleft,
  getUsersInRoom
} = require("./utilities/user")

const server = http.createServer(app)
const io = socketio(server)

let username = "venky"

app.use(express.static(path.join(__dirname, "public")))

io.on("connection", socket => {
  console.log("connection created")

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    /*
    if (user.error) {
      console.log(user)
      socket.emit("errorr", user)
    }  */

    socket.join(user.room)

    //welcome message
    socket.emit("message", formatmessages(username, `welcome ${user.username}`))

    //once user join broadcast to everyone except user
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatmessages(username, `${user.username} has joined chat`)
      )

    // number of users joined the chat

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
  })

  socket.on("chatMessage", data => {
    const user = currentUser(socket.id)

    io.to(user.room).emit("message", formatmessages(user.username, data))
  })

  socket.on("disconnect", () => {
    const user = userleft(socket.id)

    if (user) {
      io.to(user.room).emit(
        "message",
        formatmessages(username, `${user.username} has left the chat`)
      )

      // number of users joined the chat

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }
  })
})

app.get("/fine", (req, res) => {
  res.send("i am fine")
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Port is running on ${PORT}`))
