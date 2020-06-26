const express=require("express")
const path=require("path")
const fs=require("fs")
const uniqid=require("uniqid")
const {join} = require("path")
const multer = require("multer")
const {readFile,writeFile,createReadStream}=require("fs-extra")
const upload = multer({})



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
  const newProduct={...req.body,_id:uniqid(),createdAt:new Date()+new Date().getHours()}
  productsArray=JSON.parse(fs.readFileSync(productsFilePath).toString())
  productsArray.push(newProduct)
  fs.writeFileSync(productsFilePath,JSON.stringify(productsArray))
  res.status(201).send(req.body)
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
//Images Path
const studentsFolderPath = join(__dirname, "../../../public/img/Products")
//POST images
router.post("/:id/uploadImage",upload.single("productImage"),async(req,res,next)=>{
  try{
    await writeFile(join(studentsFolderPath,req.params.id+'.'+req.file.originalname.split('.').pop()), req.file.buffer)
    const productsArray= JSON.parse(fs.readFileSync(productsFilePath).toString())
    productsArray.forEach(product =>{
      if(product._id === req.params.id){
        product['imageUrl'] =` http://localhost:3000/img/Products/${req.params.id}.${req.file.mimetype.slice(-3)}`
      }
      fs.writeFileSync(productsFilePath, JSON.stringify(productsArray))
      res.send('uploaded successfully')
    })
  }
  catch(error){

  }
})


module.exports=router