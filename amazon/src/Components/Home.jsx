import React, { Component } from 'react'
import{Container,Row,Col,Card,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import {IconContext} from 'react-icons'

class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products:[],
       rating :20
    }
  }
  componentDidMount=async()=>{
    let response = await fetch("http://localhost:3456/products/")
    let products=await response.json()
    this.setState({products})
  }
  
  render() {
    
    return (
        <Container className="home">
          <p className='text-center display-4'>Products</p>
       <Row >
        {this.state.products.map(product=>{
        return(
          <>
        <Col xs={3}>
          <Link to ={`/details/${product._id}`}>
         <Card  className='my-2 mx-1 productCards'>
         <Card.Img className='img-fluid' variant="top" src={product.imageurl} />
         <Card.Body>
           <Card.Text>
             <p><span style={{fontSize:"15px",marginBottom:'auto'}}>$</span>{product.price}</p>
             <p>{product.name}</p>
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
                <div className="starsFilled" style={{width :`${(product.totalRating/product.NumberOfReviews)*20}%`}}>
                  <IconContext.Provider value={{className:'starIconsFilled'}}>
                      <p><AiFillStar/></p>
                      <p><AiFillStar/></p>
                      <p><AiFillStar/></p>
                      <p><AiFillStar/></p>
                      <p><AiFillStar/></p>
                  </IconContext.Provider>
                </div>
                {product.NumberOfReviews ? <p className='reviewsCount'>({product.NumberOfReviews})</p> :
                <p className='reviewsCount'>(0)</p>
                }
                
              </div>
           </Card.Text>
           {/* <Link to ={`/details/${product._id}`}><Button variant="primary">More Details</Button></Link> */}
         </Card.Body>
       </Card>
       </Link>
       </Col>
       </>
        )}
        )}
       </Row>
        </Container>
    )
  }
}

export default Home
