import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { SelectContext } from '../../App';
import "./Headers.css"
import logo from './Logo.png'
import firebaseConfig from '../Login/firebase.config';
const Headers = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const [,,loggedInUser, setLoggedInUser] = useContext(SelectContext)
    const signOutHandeler = () => {
        firebase.auth().signOut().then( res => {
            setLoggedInUser({})
          }).catch(error =>{
            console.log(error);
          });
    }
    return (
        <div style={{marginLeft : "100px",marginRight : "100px"}} >
            <Navbar className="new"  variant="dark">
                <Navbar.Brand to="/"><img className="logos" src={logo} alt=""/></Navbar.Brand>
                <Nav className="mr-auto">
                <FormControl type="text" placeholder="Search" className="ml-5 search" />
                <Nav.Link className="active text-dark link ml-5" to="#home">News</Nav.Link>
                <Nav.Link className="active text-dark link ml-5" to="#features">Destination</Nav.Link>
                <Nav.Link className="active text-dark link ml-5" to="#pricing">Blog</Nav.Link>
                <Nav.Link className="active text-dark link ml-5" to="#pricing">Contact</Nav.Link>    
                {
                    loggedInUser.name ? <Link className="active ml-5 login" onClick={signOutHandeler}>Logout</Link>
                    : <Link className="active ml-5 login" to="/login">Login</Link>
                }             
                </Nav>          
                
            </Navbar>  
        </div>
        
    );
};

export default Headers;