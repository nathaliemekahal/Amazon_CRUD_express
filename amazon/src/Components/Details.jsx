import React, { Component } from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap'


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
            <Container>
              <Row className="row-cols-2 justify-content-center">
                <Col>
                <img style={{width:'100%'}}src={this.state.product.imageUrl}/>
                </Col>
                <Col>
                  <h1>{this.state.product.name}</h1>
                  <h2>{this.state.product.description}</h2>
                  <h4>Price:{this.state.product.price}$</h4>
                  <Button variant="danger" onClick={()=>this.removeProduct(this.state.product._id)}>Delete </Button>
                  <Button className="ml-2" variant="warning" onClick={this.editProduct}>Edit </Button>

                </Col>
              </Row>
            </Container>
        )
    }
}

export default Details
