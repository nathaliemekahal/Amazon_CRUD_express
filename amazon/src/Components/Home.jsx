import React, { Component } from 'react'
import{Container,Row,Col,Card,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products:[]
    }
  }
  componentDidMount=async()=>{
    let response = await fetch("http://localhost:3006/products")
    let products=await response.json()
    this.setState({products})
  }
  
  render() {
    
    return (
        <Container>
          <p className='text-center display-4'>Products</p>
       <Row >
        {this.state.products.map(product=>
        <Col xs={3}>
         <Card  className='my-2 mx-1'>
         <Card.Img className='img-fluid' variant="top" src={product.imageUrl} />
         <Card.Body>
           <Card.Title>{product.name}</Card.Title>
           <Card.Text>
             {product.description}
           </Card.Text>
           <Link to ={`/details/${product._id}`}><Button variant="primary">More Details</Button></Link>
         </Card.Body>
       </Card>
       </Col>
        )}
       </Row>
        </Container>
    )
  }
}

export default Home
