import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./header.css"
import logo from './Logo.png'
const Home = () => {
    
    return (
        <div style={{marginLeft : "100px",marginRight : "100px"}} >
            <Navbar  variant="dark">
                <Navbar.Brand to="/"><img className="logo" src={logo} alt=""/></Navbar.Brand>
                <Nav className="mr-auto">
                <FormControl type="text" placeholder="Search" className="ml-5 search" />
                <Nav.Link className="active link ml-5" to="#home">News</Nav.Link>
                <Nav.Link className="active link ml-5" to="#features">Destination</Nav.Link>
                <Nav.Link className="active link ml-5" to="#pricing">Blog</Nav.Link>
                <Nav.Link className="active link ml-5" to="#pricing">Contact</Nav.Link>    
                <Link className="active ml-5 login" to="/login">Login</Link>             
                </Nav>          
                
            </Navbar>  
        </div>
        
    );
};

export default Home;