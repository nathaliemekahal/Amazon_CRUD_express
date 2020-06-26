const express=require('express')
const cors=require('cors')
const reviewsRoutes = require('./services/reviews')

//Routes
const productsRoute=require("./services/products")
const server=express()
server.use(cors())
server.use(express.json())

server.use("/products",productsRoute)


server.use("/reviews",reviewsRoutes)

server.listen(3006,()=>{
    console.log("working on port 3006")
})