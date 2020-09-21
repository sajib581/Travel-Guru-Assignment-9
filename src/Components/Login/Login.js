import React, { useContext, useState } from 'react';
import './Login.css'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { SelectContext } from '../../App';

import { Link, NavLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import Headers from '../Header/Headers';
import { createUserHandeler, signInHandeler, FbSignInHandeler, googleSignInHandeler, initializeFirebaseApp, updateUserNameHandeler, verifyEmailHandeler, forgetPasswordHandeler } from './LoginManager';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const Login = () => {
    initializeFirebaseApp()
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [user,setUser] = useState({
        isLoggedIn : false,
        name : '' ,
        email : '' ,
        password : '' ,
        photo : '' ,
        error : '' ,  
        success : false
    })
    const classes = useStyles();
    const [,,loggedInUser, setLoggedInUser] = useContext(SelectContext)
    const [forgatePassword, setForgatePassword] = useState(false)
    const [message,setMessage] = useState({
        success : "" ,
        error : ""
    })
    const [newUser, setNewUser] = useState(true)

    const blurHandeler = (e) => {
        let isFieldValid = true 
        let tempPassword = ''
        if(e.target.name === 'name'){
            isFieldValid = e.target.value.length>3 
        } 
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value) 
        }        
        if(e.target.name === 'password'){
            const passwordLength = e.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = passwordHasNumber && passwordLength        
        }
        
        if(isFieldValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value
            setUser(newUserInfo)
        }
    }

    const submitHandeler =(e) => {
        if(newUser && user.email && user.password){
            createUserHandeler(user.email, user.password, user.name)
            .then(res =>{
                verifyEmail()
                updateUserName(user.name)
                setUser(res)
                setLoggedInUser(res)
                history.replace(from)
            })
        }
        if(!newUser && user.email && user.password){
            signInHandeler(user.email, user.password)
            .then(res => {
                setUser(res)
                setLoggedInUser(res)
                history.replace(from)
            })
        }
        if(!newUser && user.email && forgatePassword){
            resetPassword(user.email)
        }
         e.preventDefault() ;
        // console.log(user.name);
        // console.log(user.email);
        // console.log(user);
    }
    
    
    const googleSignIn = () => {
        googleSignInHandeler()
        .then(res =>{
            setUser(res)
            setLoggedInUser(res)
            history.replace(from)
        })
    }
    const signUpLoginToggeler = () => {
        setNewUser(!newUser)
    }
    
    const updateUserName = (name) => {
        updateUserNameHandeler(name)

    }
    const fbSignIn = () => {
        FbSignInHandeler()
        .then(res =>{
            setUser(res)
            setLoggedInUser(res)
            history.replace(from)
        })
    }
    const verifyEmail = () => {
        verifyEmailHandeler()
    }
    const resetPassword = (email) => {
        forgetPasswordHandeler()
        .then(res =>{
            setUser(res)
        })
    }
    return (
        <div>
            <Headers></Headers>
            <div className="forms">            
                <div className="inputs">
                    <h4>{newUser?"Create an account": forgatePassword ? "Reset Password" : "SignIn"}</h4>   
                    <form className={classes.root} noValidate autoComplete="off">
                        {
                            newUser && <TextField name="name" onBlur={blurHandeler} required id="standard-basic" label="First name" />                             
                        }
                        {
                            newUser && <TextField name="lastName" onBlur={blurHandeler} id="standard-basic" label="Last Name" />                          
                        }
                        <TextField name="email" required onBlur={blurHandeler} id="standard-basic" label="Username or email" />
                        {
                            !forgatePassword && <TextField name="password" required type="password" onBlur={blurHandeler} id="standard-basic" label="Password" />
                        }
                        {
                            newUser && <TextField name="confirmPassword" type="password" onBlur={blurHandeler} id="standard-basic" label="Confirm Password" />
                                                       
                        }                                            
                        {
                            !newUser && <Link onClick = {()=>setForgatePassword(true)}>ForgatePassword</Link>
                        }
                        {
                            newUser ? <button className="login button" onClick={submitHandeler} type="submit">Create an account</button>
                        : <button className="login button" onClick={submitHandeler} type="submit">{forgatePassword?"Send Email": "SignIn"}</button>
                        }
                        
                        {
                            newUser?<p>Already have an account? <NavLink onClick={signUpLoginToggeler} to="/login"> SignIn</NavLink></p>
                            : <p>Create an account? <NavLink onClick={signUpLoginToggeler} to="/login"> SignUp</NavLink></p>
                        }
                    </form>                    
            </div>
            { <p style={{color:"red"}}>{user.error}</p> }
            { <p style={{color:"green"}}>{user.success}</p> }
            <p><small><strong>OR</strong></small></p>
            <div>
                <div className="row facebook" onClick={fbSignIn}>
                    <div className="col-md-2 icon">
                        <img src="https://i.ibb.co/DYndMXm/fb.png" alt=""/>
                    </div>
                    <div className="col-md-10">
                        <small><strong>Continiue with facebook</strong></small>
                    </div>
                </div>
                <div className="row google" onClick={googleSignIn}>
                    <div className="col-md-2 icon">
                    <img src="https://i.ibb.co/x5wzGKp/google.png" alt=""/>
                    </div>
                    <div className="col-md-10">
                    <small><strong>Continiue with google</strong></small>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;