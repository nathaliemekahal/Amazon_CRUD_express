const express=require("express")
const path=require("path")
const fs=require("fs")
const uniqid=require("uniqid")
const {join} = require("path")
const {readFile,writeFile,createReadStream}=require("fs-extra")




const router=express.Router()

const productsFilePath=path.join(__dirname,"products.json")

router.get("/",(req,res)=>{
  const fileContent=(fs.readFileSync(productsFilePath)).toString()
  res.send(JSON.parse(fileContent))
})
router.get("/:id",(req,res)=>{
  const productsArray=JSON.parse(fs.readFileSync(productsFilePath).toString())
  let filteredArray=productsArray.filter(product=>
    product._id===req.params.id
  )
 
  res.send(filteredArray)
})

router.post("/",(req,res)=>{
  const newProduct={_id:uniqid(),...req.body,createdAt:new Date()+new Date().getHours()}
  productsArray=JSON.parse(fs.readFileSync(productsFilePath).toString())
  productsArray.push(newProduct)
  fs.writeFileSync(productsFilePath,JSON.stringify(productsArray))
  res.status(201).send(newProduct)
})

router.delete("/:id",(req,res)=>{
  const productsArray=JSON.parse(fs.readFileSync(productsFilePath).toString())
  let filteredArray=productsArray.filter(product=>
    product._id!==req.params.id
  )
  fs.writeFileSync(productsFilePath,JSON.stringify(filteredArray))
  res.status(200).send(filteredArray)
})
router.put("/:id",(req,res)=>{
  let productsArray=JSON.parse(fs.readFileSync(productsFilePath).toString())
  let filteredArray=productsArray.filter(product=>
    product._id!==req.params.id)
  let replacement={_id:req.params.id,...req.body,updatedAt:new Date()+new Date().getHours()}  
  filteredArray.push(replacement)
  res.send(filteredArray)
})

// router.post("/:id/uploadImage",upload.single("productiamge"),async(req,res,next)=>{
//   try{
//     join(productsFilePath,req.params.id+'.'+req.file.originalname.split('.').pop())
  
//   }
//   catch(error){

//   }
// })


module.exports=router