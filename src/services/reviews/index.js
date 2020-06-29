const express = require('express')
const fse = require('fs-extra')
const path = require('path')
const uniqid = require('uniqid')

const router = express.Router()
const reviewsPath = path.join(__dirname,"reviews.json")
const productsFilePath = path.join(__dirname,"../products/products.json")

function readReviews (file){
    const bufferFileContent = fse.readFileSync(file)
    const reviewsArray = JSON.parse(bufferFileContent.toString())
    return reviewsArray
}

router.get("/",(req,res)=>{
    const bufferFileContent = fse.readFileSync(reviewsPath)
    const reviewsArray = JSON.parse(bufferFileContent.toString())
    res.send(reviewsArray)
})
router.get('/:id',(req,res)=>{
    // readReviews(reviewsPath)
    const bufferFileContent = fse.readFileSync(reviewsPath)
    const reviewsArray = JSON.parse(bufferFileContent.toString())
    const reviews = []
    reviewsArray.forEach(review =>{
        if(review.elementId === req.params.id){
            reviews.push(review)
        }
    })
    res.send(reviews)
})

router.post('/:id',(req,res)=>{
    const content ={...req.body}
    const rating = content.rate
    const newReview = {...req.body,id:uniqid(),elementId:req.params.id,createdAt:new Date()}
    const bufferFileContent = fse.readFileSync(reviewsPath)
    const reviewsArray = JSON.parse(bufferFileContent.toString())
    reviewsArray.push(newReview)
    fse.writeFileSync(reviewsPath, JSON.stringify(reviewsArray))
    //  res.send(content['rate'])
    // console.log(content.rate)

    const productBufferFileContent = fse.readFileSync(productsFilePath)
    const productFileContent = JSON.parse(productBufferFileContent.toString())
    productFileContent.forEach(product =>{
        if(product._id === req.params.id){
            if(product.NumberOfReviews){
                product.NumberOfReviews +=1
            }else{
                product.NumberOfReviews = 1
            }
        }
        if(product._id === req.params.id){
            if(product.totalRating){
                product.totalRating += rating
            }else{
                product.totalRating = rating
            }
        }
    })

     fse.writeFileSync(productsFilePath ,JSON.stringify(productFileContent))

    // res.send(productFileContent)
    res.send('ok')
})

router.put('/:id/:reviewId',(req,res)=>{
    const bufferFileContent = fse.readFileSync(reviewsPath)
    const reviewsArray = JSON.parse(bufferFileContent.toString())
    let createdDate = ''
    reviewsArray.forEach(review =>{
        if(review.id === req.params.reviewId){
            createdDate = review.createdAt
        }
    })
    const filteredArray = reviewsArray.filter(element => element.id !== req.params.reviewId)
    // console.log('filteredARRAY',filteredArray)
    const review = req.body
    review.elementId = req.params.id
    review.id = req.params.reviewId
    review.createdAt = createdDate
    review.updatedAt = new Date()
    filteredArray.push(review)
    fse.writeFileSync(reviewsPath , JSON.stringify(filteredArray) )
    res.send(filteredArray)
    
})

router.delete('/:id/:reviewId',(req,res)=>{
    const bufferFileContent = fse.readFileSync(reviewsPath)
    const reviewsArray = JSON.parse(bufferFileContent.toString())
    const filteredArray = reviewsArray.filter(review => review.id !== req.params.reviewId)
    fse.writeFileSync(reviewsPath, JSON.stringify(filteredArray))
    
    const productBufferFileContent = fse.readFileSync(productsFilePath)
    const productFileContent = JSON.parse(productBufferFileContent.toString())
    productFileContent.forEach(product =>{
        if(product._id === req.params.id){
            if(product.NumberOfReviews){
                product.NumberOfReviews -=1
            }
        }
        // if(product._id === req.params.id){
        //     if(product.totalRating){
        //         product.totalRating -= rating
        //     }
        // }
    })
    fse.writeFileSync(productsFilePath ,JSON.stringify(productFileContent))
    res.send('ok')
})

module.exports = router