const express=require('express')
const cors=require('cors')

const server=express()
server.use(express.json())
server.use(cors())

server.listen(3006,()=>{
    console.log("working on port 3006")
})