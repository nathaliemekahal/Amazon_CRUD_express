import React, { Component } from 'react'
import{Container,Row,Col,Card,Button} from 'react-bootstrap'

export class searchProducts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             filteredArray :[],
             query :''
        }
    }
    componentDidMount = async()=>{
        let params = new URLSearchParams(window.location.search)
        let word = params.get('name')
        this.setState({query : word})
        let response =await fetch("http://localhost:3006/products")
        let productsArray = await response.json()
        console.log(productsArray)
        let filteredArray = productsArray.filter(product => product.name.includes(word))
        this.setState({filteredArray})
    }
    render() {
        return (
           <Container>
               <p className='searchText'>search results for "{this.state.query}"</p>
               <Row>
               {this.state.filteredArray.map(product=>
                <Col xs={3}>
                    <Card  className='my-2 mx-1'>
                    <Card.Img className='img-fluid' variant="top" src={product.imageurl} />
                    <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Button variant="primary">More Details</Button>
                    </Card.Body>
                </Card>
                </Col>
                    )}
               </Row>
           </Container>
        )
    }
}

export default searchProducts
