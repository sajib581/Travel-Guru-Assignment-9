import React, { useContext, useState } from 'react';
import './Login.css'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { SelectContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

import { Link, NavLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import Headers from '../Header/Headers';
import { initializeFirebaseApp } from './LoginManager';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const Login = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
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

    const submitHandeler =(e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                const newUserInfo = {...user}
                newUserInfo.error = ''
                newUserInfo.success = true  
                setUser(newUserInfo)
                updateUserName(user.name)
                setLoggedInUser(newUserInfo)
                verifyEmail()
                history.replace(from)
                
            })
            .catch(error=> {
                const errorMessage = error.message;
                const newUserinfo = {...user}
                newUserinfo.error = errorMessage
                setUser(newUserinfo)
              });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                const newUserInfo = {...user};
                newUserInfo.error = ''
                newUserInfo.success = true 
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo)
                history.replace(from)
            })
            .catch( error => {
                var errorMessage = error.message;
                const newUserInfo = {...user}
                newUserInfo.error = errorMessage
                newUserInfo.success = false
                setUser(newUserInfo)
                console.log(errorMessage);
              });
        }
        if(!newUser && user.email && forgatePassword){
            resetPassword(user.email)
        }
        e.preventDefault() ;
    }
    const [newUser, setNewUser] = useState(true)
    
    const googleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(res =>{
            const user = res.user;            
            const {email,displayName,photoURL} = user
            const signedInUser = {
                isLoggedIn : true,
                name : displayName ,
                email : email ,
                photo : photoURL ,
                success:true
              } 
                setUser(signedInUser)
                setLoggedInUser(signedInUser)
                history.replace(from)
        })
        .catch(error =>{
            var errorMessage = error.message;
            console.log(errorMessage);
        })
    }
    const userHandeler = () => {
        setNewUser(!newUser)
    }
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
    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name        
        })
        .then(res => {
            console.log('Name update successfully');
        })
        .catch(error=> {
            console.log(error);
        });
    }
    const fbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(fbProvider).then(res => { 
            const user = res.user;            
            const {email,displayName,photoURL} = user
            const signedInUser = {
                isLoggedIn : true,
                name : displayName ,
                email : email ,
                photo : photoURL ,
                success:true
              } 
                setUser(signedInUser)
                setLoggedInUser(signedInUser)
                history.replace(from)
          }).catch(function(error) {
            var errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    const verifyEmail = () => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification()
        .then( res =>{
        })
        .catch(error=> {
            console.log(error);
        });
    }
    const resetPassword = (email) => {
        var auth = firebase.auth();    
        auth.sendPasswordResetEmail(email)
        .then( res=>{
            const newUser = {...user}
            user.success = "Please Check Your Email"
            user.error = "";
        setUser(newUser)
        }).catch(error => {
            console.log(error);
        });
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
                            newUser?<p>Already have an account? <NavLink onClick={userHandeler} to="/login"> SignIn</NavLink></p>
                            : <p>Create an account? <NavLink onClick={userHandeler} to="/login"> SignUp</NavLink></p>
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