import React, { Component } from 'react'
import {Container,Row,Col,Button,Dropdown} from 'react-bootstrap'
import {MdEdit} from 'react-icons/md'
import {AiFillStar ,AiOutlineStar} from 'react-icons/ai'
import {IconContext} from 'react-icons'
import Review from './Review'
class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:{},
             reviews:{}
        }
    }
    componentDidMount=async()=>{
        let response =await fetch("http://localhost:3006/products/"+this.props.match.params.id)
        let productObj=await response.json()
        this.setState({product:productObj[0]})
    }
    removeProduct=async(productId)=>{
        let response=await fetch("http://localhost:3006/products/"+productId,{
          method:'DELETE',
         
        })

      if(response.ok){
        alert('Successfully Deleted')
        this.props.history.push('/')

      }
        
    }
    editProduct=()=>{
      this.props.history.push('/uploadProduct/'+this.props.match.params.id)
    }
    
    render() {
        return (
          <Container fluid style={{height:'85vh'}}>
            <Container className='details'>
              <Row className="row-cols-2 justify-content-center">
                <Col xs={4}>
                <img className='img-fluid' style={{width:'100%'}}src={this.state.product.imageUrl}/>
                </Col>
                <Col className='info' xs={7}>
                  <p>{this.state.product.name}</p>

                  <div className="stars-outer">
                <div className="stars">
                  <IconContext.Provider value={{className:'starIcons'}}>
                      <p><AiOutlineStar/></p>
                      <p><AiOutlineStar/></p>
                      <p><AiOutlineStar/></p>
                      <p><AiOutlineStar/></p>
                      <p><AiOutlineStar/></p>
                  </IconContext.Provider>
                </div>
                <div className="starsFilled" style={{width :`${(this.state.product.totalRating/this.state.product.NumberOfReviews)*20}%`}}>
                  <IconContext.Provider value={{className:'starIconsFilled'}}>
                      <p><AiFillStar/></p>
                      <p><AiFillStar/></p>
                      <p><AiFillStar/></p>
                      <p><AiFillStar/></p>
                      <p><AiFillStar/></p>
                  </IconContext.Provider>
                </div>
                
              </div>
                  <p>Price:<span style={{color:'red'}}>  ${this.state.product.price}</span></p>
                  <p>Description : {this.state.product.description}</p>
                  {/* <Button variant="danger" onClick={()=>this.removeProduct(this.state.product._id)}>Delete </Button> */}
                  {/* <Button className="ml-2" variant="warning" onClick={this.editProduct}>Edit </Button> */}

                <Review id={this.props.match.params.id}/>
                </Col>
                <Col xs={1}>
                <Dropdown>
                    <Dropdown.Toggle className='d-flex'>
                    <IconContext.Provider value={{className:'editIcon'}}>
                      <MdEdit />
                    </IconContext.Provider>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item  onClick={this.editProduct}
                  >Edit Product</Dropdown.Item>

                    <Dropdown.Item onClick={()=>this.removeProduct(this.state.product._id)}>
                      Delete Product</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Col>
              </Row>
            </Container>
            </Container>
        )
    }
}

export default Details
