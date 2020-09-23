import React, { useContext, useState } from 'react';
import './Login.css'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { SelectContext } from '../../App';

import { Link, useHistory, useLocation } from 'react-router-dom';
import Headers from '../Header/Headers';
import { createUserHandeler, forgetPasswordHandeler, signInHandeler, FbSignInHandeler, googleSignInHandeler, updateUserNameHandeler, verifyEmailHandeler } from './LoginManager';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      width: '25ch',
    },
  },
}));
const Login = () => {    
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
    const [error,setError] = useState({})
    const [newUser, setNewUser] = useState(true)

    //My Functions
    const showError = (name, message) => {
        let newError = {...error}
        newError[name] = message
        setError(newError)
    }
    const handelResponse = (res,replace) => {
        setUser(res)
        setLoggedInUser(res)
        if(replace){
            history.replace(from)
        }        
    }
    const removeErrrors = ()=> {
        setForgatePassword(true)
        setError({}) 
    }
    //Firebase Functions
    const resetPassword = (email) => {
        forgetPasswordHandeler(email) 
        showError("success","An email has been sent to your email. Please Check.")       
    }

    const blurHandeler = (e) => {
        let isFieldValid = true 
        if(e.target.name === 'name'){
            isFieldValid = e.target.value.length>3 
            if (isFieldValid) {          
                showError("name","")
            }else{                 
                showError("name","Name Must Be More Than 4 Letters")
            }
        } 
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value) 
            if (isFieldValid) {          
                showError("email","")
            }else{
                showError("email","Please Give Valid Email")
            }
        }        
        if(e.target.name === 'password'){
            const passwordLength = e.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = passwordHasNumber && passwordLength    
            if (isFieldValid) {          
                showError("password","")
            }else{
                showError("password","Password Min 6 character and a character ")
            }    
        }        
        if(isFieldValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value
            setUser(newUserInfo)
        }
    }

    const submitHandeler =(e) => {
        if(newUser && user.email && user.password){
            createUserHandeler(user.email, user.password)
            .then(res =>{
                if(res.isLoggedIn){
                    verifyEmail()
                    updateUserName(user.name)
                    handelResponse(res, true)
                }else{
                    showError("result",res.error)
                }                
            })            
        }
        else if(!newUser && user.email && user.password && !forgatePassword){
            signInHandeler(user.email, user.password)
            .then(res => {
                if(res.isLoggedIn){
                    handelResponse(res, true)
                }else{
                    showError("result",res.error)
                }
            })           
        }
        else if(!newUser && user.email && forgatePassword){
            resetPassword(user.email)
        } 
        else{
            showError("result","Invalid Credential")
        }     
        e.preventDefault() ;        
    } 

    const signUpLoginToggeler = (e) => {
        setNewUser(!newUser)
        setError({})
        e.preventDefault();
    }   
    
    const googleSignIn = () => {
        googleSignInHandeler()
        .then(res =>{
            handelResponse(res, true)
        })
    }
        
    const updateUserName = (name) => {
        updateUserNameHandeler(name)

    }
    const fbSignIn = () => {
        FbSignInHandeler()
        .then(res =>{
            handelResponse(res, true)
        })
    }
    const verifyEmail = () => {
        verifyEmailHandeler()
    }
    
    return (
        <div>
            <Headers></Headers>
            <div className="forms">            
                <div className="inputs">
                    <h4>{newUser?"Create an account": forgatePassword ? "Reset Password" : "SignIn"}</h4>   
                    <form className={classes.root} noValidate autoComplete="off">
                        {
                            newUser && <TextField name="name" onBlur={blurHandeler}  id="standard-basic" label="First name" />                             
                        }
                        {error.name && <small style={{color:"red"}}>{ error.name}</small>}
                        {
                            newUser && <TextField name="lastName" onBlur={blurHandeler} id="standard-basic" label="Last Name" />                          
                        }
                        <TextField name="email"  onBlur={blurHandeler} id="standard-basic" label="Username or email" />
                        {error.email && <small style={{color:"red"}}>{ error.email}</small>}
                        {
                            !forgatePassword && <TextField name="password" required type="password" onBlur={blurHandeler} id="standard-basic" label="Password" />
                        }
                        {error.password && <small style={{color:"red"}}>{ error.password}</small>}
                        {
                            newUser && <TextField name="confirmPassword" type="password" onBlur={blurHandeler} id="standard-basic" label="Confirm Password" />                                            
                        }                                            
                        {
                            !newUser && <Link to="/login" onClick = {removeErrrors}>ForgatePassword</Link>
                        }                    
                        {
                            newUser ? <button className="login button" onClick={submitHandeler} type="submit">Create an account</button>
                        : <button className="login button" onClick={submitHandeler} type="submit">{forgatePassword?"Send Email": "SignIn"}</button>
                        }                        
                        {
                            newUser?<p>Already have an account? <small className="toggel" onClick={signUpLoginToggeler}><strong>SignIn</strong></small></p>
                            : <p>Create an account? <small className="toggel" onClick={signUpLoginToggeler}><strong>SignUp</strong></small></p>
                        }
                    </form>                    
            </div>
            {error.result && <p style={{color:"red"}}>{error.result}</p> }
            {error.success && <p style={{color:"green"}}>{error.success}</p> }
            <div className="mt-3">
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