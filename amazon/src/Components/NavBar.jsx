import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Nav,Navbar,FormControl,Form,Button} from 'react-bootstrap'
import {Link,withRouter} from 'react-router-dom'

class NavBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             query :''
        }
    }
    updateQuery =(e)=>{
        let query = e.currentTarget.value
        this.setState({query})
    }
    sendQuery =async()=>{
        // let response
        this.props.history.push('/products/searchResults?name='+this.state.query)
        console.log(this.props)
    }
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/100px-Amazon_logo.svg.png" alt=""/></Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home"><Link to='/uploadProduct'>Backend</Link></Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" onChange={this.updateQuery} className="mr-sm-2" />
                <Button variant="outline-info" onClick={this.sendQuery}>Search</Button>
                </Form>
            </Navbar>
        )
    }
}

export default withRouter(NavBar)
