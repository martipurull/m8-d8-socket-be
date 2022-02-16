import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import { User } from './types'

let onlineUsers: User[] = []

const server = express()

server.use(cors())

const httpServer = createServer(server)
const io = new Server(httpServer, {})

io.on('connection', (socket) => {
    socket.on('setUsername', ({ username, room }) => {
        socket.join(room)
        onlineUsers.push({ username, id: socket.id, room })
        socket.emit('loggedin')
        socket.broadcast.emit('newConnection')
    })
    socket.on('sendMessage', ({ message, room }) => {
        try {
            socket.to(room).emit('message', message)
        } catch (error) {
            console.log(error)
        }
    })
    socket.on('sendPrivateMessage', ({ recipient, message }) => {
        try {
            socket.to(recipient).emit('privateMessage', socket.id, message)
        } catch (error) {
            console.log(error);
        }
    })
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(u => u.id !== socket.id)
    })
})

server.get('/online-users', (req, res) => {
    res.send({ onlineUsers })
})

mongoose.connect(<string>process.env.MONGO_CONNECTION)
mongoose.connection.on('connected', () => {
    console.table(listEndpoints(server))
    console.log('Connected to Mongo')
})
httpServer.listen(3030, () => {
    console.log('Server listening on port 3030')
})
mongoose.connection.on('error', (err: any) => {
    console.log(err)

})