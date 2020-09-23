import React, { useContext } from 'react';
import {FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
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
    const [select,setSelect,loggedInUser, setLoggedInUser] = useContext(SelectContext)
    const signOutHandeler = () => {
        firebase.auth().signOut().then( res => {
            setSelect('')
            setLoggedInUser({})
          }).catch(error =>{
            console.log(error);
          });
    }
    let history = useHistory();
    const clickHandeler = () => {        
        history.push("/");
    }
    return (
        <div style={{marginLeft : "100px"}} >
            <Navbar className="new"  variant="dark">
                <Navbar.Brand style={{cursor : "pointer"}} onClick = {clickHandeler}><img className="logos" src={logo} alt=""/></Navbar.Brand>
                <Nav className="mr-auto">
                <FormControl type="text" placeholder="Search" className="ml-3 search" />
                <Nav.Link className="active text-dark link ml-3" to="#home">News</Nav.Link>
                <Nav.Link className="active text-dark link ml-3" to="#features">Destination</Nav.Link>
                <Nav.Link className="active text-dark link ml-3" to="#pricing">Blog</Nav.Link>
                <Nav.Link className="active text-dark link ml-3" to="#pricing">Contact</Nav.Link>    
                {
                    loggedInUser.name ? <Link to="/" className="active ml-5 login" onClick={signOutHandeler}>Logout</Link>
                    : <Link className="active ml-5 login" to="/login">Login</Link>
                }             
                </Nav>          
                
            </Navbar>  
        </div>
        
    );
};

export default Headers;