import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SelectContext } from '../../App';
import "./header.css"
import logo from './Logo.png'
const Home = () => {
    const [,,loggedInUser, setLoggedInUser] = useContext(SelectContext)
    return (
        <div style={{marginLeft : "100px"}} >
            <Navbar  variant="dark">
                <Navbar.Brand to="/"><img className="logo" src={logo} alt=""/></Navbar.Brand>
                <Nav className="mr-auto">
                <FormControl type="text" placeholder="Search" className="ml-3 search" />
                <Nav.Link className="active link ml-3" to="#home">News</Nav.Link>
                <Nav.Link className="active link ml-3" to="#features">Destination</Nav.Link>
                <Nav.Link className="active link ml-3" to="#pricing">Blog</Nav.Link>
                <Nav.Link className="active link ml-3" to="#pricing">Contact</Nav.Link>                          
                {
                    loggedInUser.name ? <Link to="/" className="active ml-5 login" >Logout</Link>
                    : <Link className="active ml-5 login" to="/login">Login</Link>
                } 
                </Nav>          
                
            </Navbar>  
        </div>
        
    );
};

export default Home;