import React, { Component } from 'react'
import{Container,Row,Col,Card,Button} from 'react-bootstrap'

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
       <Row className="row-cols-sm-2 row-cols-md-4">
        {this.state.products.map(product=>
         <Card>
         <Card.Img className='image-fluid' variant="top" src={product.imageUrl} />
         <Card.Body>
           <Card.Title>{product.name}</Card.Title>
           <Card.Text>
             {product.description}
           </Card.Text>
           <Button variant="primary">Go somewhere</Button>
         </Card.Body>
       </Card>
        )}
       </Row>
        </Container>
    )
  }
}

export default Home
