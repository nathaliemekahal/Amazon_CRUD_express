import React, { Component } from 'react'
import { Container,Form,FormControl,Col,Dropdown } from 'react-bootstrap'
import {AiFillStar} from 'react-icons/ai'
import {MdSend,MdEdit} from 'react-icons/md'
import {IconContext} from 'react-icons'

class Review extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             reviews :[],
             review :{
                 comment:'',
                 rate:'',
                 id:''
             },
             editMode:false
        }
    }
    componentDidMount = async()=>{
        let response = await fetch(`http://127.0.0.1:3006/reviews/${this.props.id}`)
        let reviews = await response.json()
        this.setState({reviews})
        console.log(this.state.reviews)
    }
    updateReview =(e)=>{
        let review = this.state.review
        let id = e.currentTarget.id
        if(id === 'rate'){
            review[id] = parseInt(e.currentTarget.value)
        }else{
            review[id] = e.currentTarget.value
        }
        this.setState({review})
    }
    sendReview =async()=>{
        if(this.state.editMode===false){
            let response = await fetch(`http://127.0.0.1:3006/reviews/${this.props.id}`,{
                method:'POST',
                body:JSON.stringify(this.state.review),
                headers : new Headers({
                    'Content-type': "application/json"
                })
            })
            if(response.ok){
                let response = await fetch(`http://127.0.0.1:3006/reviews/${this.props.id}`)
                let reviews = await response.json()
                this.setState({reviews})
                console.log('REVIEWS',this.state.reviews)
            }
        }
        else if(this.state.editMode===true){
            let response = await fetch(`http://127.0.0.1:3006/reviews/${this.props.id}/${this.state.review.id}`,{
                method:'PUT',
                body:JSON.stringify(this.state.review),
                headers : new Headers({
                    'Content-type': "application/json"
                }
                )
            
            })
          
            if(response.ok){
                let response = await fetch(`http://127.0.0.1:3006/reviews/${this.props.id}`)
                let reviews = await response.json()
                this.setState({reviews})
                console.log('REVIEWS',this.state.reviews)
                this.setState({editMode:false})
            }
        }
      
    }
    removeReview=async(reviewId)=>{
        let response=await fetch("http://localhost:3006/reviews/"+this.props.id+'/'+reviewId,{
          method:'DELETE',       
        })
      if(response.ok){
        alert('Successfully Deleted')
        let response = await fetch(`http://127.0.0.1:3006/reviews/${this.props.id}`)
            let reviews = await response.json()
            this.setState({reviews})
            console.log('REVIEWS',this.state.reviews)
      }       
    }
    editReview=async(review)=>{
        let reviewObj ={
            comment:review.comment,
            rate:review.rate,
            id:review.id
        }
        this.setState({review:reviewObj})
        this.setState({editMode:true})
        
    }
    render() {
        return (
            <>
           
                
                <Container className='reviews'>
                <div>
                    <p>Reviews</p>
                    <ul>
                       {this.state.reviews.length>0 ? 
                    this.state.reviews.map(review =>{
                        return(
                          <li>
                              {review.rate}
                              <IconContext.Provider value={{className:'reviewIcon'}}>
                                 <p><AiFillStar/></p> 
                              </IconContext.Provider>
                             <span> {review.comment} by {review.elementId}</span>
                             <Dropdown>
                                <Dropdown.Toggle className='d-flex'>
                                <IconContext.Provider value={{className:'editIcon'}}>
                                <MdEdit />
                                </IconContext.Provider>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item  onClick={()=>this.editReview(review)}
                            >Edit Review</Dropdown.Item>

                                <Dropdown.Item onClick={()=>this.removeReview(review.id)}>
                                Delete Review</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                           </li>
                        )
                     }) : <p className='noreview'>No reviews yet!!! Be the first to submit one</p>   
                    }
                    </ul>
                    <div>
                    {this.state.editMode===false&&
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control onChange ={this.updateReview} id='comment' />
                                </Form.Group>
                                <Form.Group as={Col} sm={2} >
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control onChange ={this.updateReview} id='rate' as="select" defaultValue="1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} sm={1}>
                                    <Form.Label></Form.Label>
                                <IconContext.Provider value={{className :'sendIcon'}}>
                                    <p onClick={this.sendReview}><MdSend/></p>
                                </IconContext.Provider>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                      }
                       {this.state.editMode===true&&
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Current Review</Form.Label>
                                    <Form.Control onChange ={this.updateReview} id='comment' value={this.state.review.comment} />
                                </Form.Group>
                                <Form.Group as={Col} sm={2} >
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control onChange ={this.updateReview} id='rate' as="select" defaultValue={this.state.review.rate}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} sm={1}>
                                    <Form.Label></Form.Label>
                                <IconContext.Provider value={{className :'sendIcon'}}>
                                    <p onClick={this.sendReview}><MdSend/></p>
                                </IconContext.Provider>
                                </Form.Group>
                            </Form.Row>
                         
                        </Form>
                      }
                    </div>
                </div>
            </Container>

          
             
        </>
        )
    }
}

export default Review
