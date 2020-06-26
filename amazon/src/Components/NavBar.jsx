import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Nav,Navbar,FormControl,Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/100px-Amazon_logo.svg.png" alt=""/></Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home"><Link to='/uploadProduct'>Backend</Link></Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        )
    }
}

export default NavBar
