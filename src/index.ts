import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import mongoose from 'mongoose'
import RoomModel from './rooms/schema'
import listEndpoints from 'express-list-endpoints'

let onlineUsers = []

const server = express()

server.use(cors())

const httpServer = createServer(server)
const io = new Server(httpServer, {})














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