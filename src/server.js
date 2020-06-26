const express=require('express')
const cors=require('cors')
const reviewsRoutes = require('./services/reviews')

const server=express()
server.use(express.json())
server.use(cors())

server.use("/reviews",reviewsRoutes)

server.listen(3006,()=>{
    console.log("working on port 3006")
})