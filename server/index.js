const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messagesRoute')
const { connectDB } = require('./db')
const socket = require('socket.io')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)
// auth vale sare routes userRoutes me hai
app.use("/api/messages", messageRoutes)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server live on port ${process.env.PORT}`)
})

connectDB()
    .then(() => {
        server
    })
    .catch((err) => {
        console.log(err)
    })

// IO starts here

const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});
// FLOW --> INDEX --> ROUTES --> CONTROLLERS --> MODELS.