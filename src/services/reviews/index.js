const express = require('express')
const fse = require('fs-extra')
const path = require('path')
const uniqid = require('uniqid')

const router = express.Router()
const reviewsPath = path.join(__dirname,"reviews.json")
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
    reviewsArray.forEach(review =>{
        if(review.elementId === req.params.id){
          res.send(review)
        }
    })
})

router.post('/:id',(req,res)=>{
    const newReview = {...req.body,id:uniqid(),elementId:req.params.id,createdAt:new Date()}
    const bufferFileContent = fse.readFileSync(reviewsPath)
    const reviewsArray = JSON.parse(bufferFileContent.toString())
    reviewsArray.push(newReview)
    fse.writeFileSync(reviewsPath, JSON.stringify(reviewsArray))
    res.send(reviewsArray)
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
    const filteredArray = reviewsArray.filter(element => element.elementId !== req.params.id)
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
    res.send(filteredArray)
})

module.exports = router