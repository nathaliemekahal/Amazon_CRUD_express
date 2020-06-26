import React, { Component } from 'react'

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
        <>
          {this.state.products.map(product=>
            <img src={product.imageUrl}/>)}
        </>
    )
  }
}

export default Home
