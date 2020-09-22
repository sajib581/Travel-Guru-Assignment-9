import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFirebaseApp = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const googleSignInHandeler = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider)
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
              return signedInUser ;                
        })
        .catch(error =>{
            var errorMessage = error.message;
            console.log(errorMessage);
        })
}

export const FbSignInHandeler = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

        return firebase.auth().signInWithPopup(fbProvider).then(res => { 
            const user = res.user;            
            const {email,displayName,photoURL} = user
            const signedInUser = {
                isLoggedIn : true,
                name : displayName ,
                email : email ,
                photo : photoURL ,
                success:true
              } 
              return signedInUser
                
          }).catch(function(error) {
            var errorMessage = error.message;
            const user = {}
            user.error = "Facebook Authentication failed"
            user.success = false ;
            return user
          });
}

export const verifyEmailHandeler = () => {
    const user = firebase.auth().currentUser;
        user.sendEmailVerification()
        .then( res =>{
        })
        .catch(error=> {
            console.log(error);
        });
}

export const createUserHandeler = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res =>{                         
                const {email,displayName,photoURL} = res.user;
                const signedInUser = {
                isLoggedIn : true,
                name : displayName ,
                email : email ,
                photo : photoURL ,
                success:true
              } 
              
              return signedInUser;              
            })
            .catch(error=> {
                const newUserinfo = {}
                const errorMessage = error.message;                
                newUserinfo.error = errorMessage
                newUserinfo.success = false
                console.log('Error Occured');
                return newUserinfo                
              });
}

export const signInHandeler = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res =>{     
                const {email,displayName,photoURL} = res.user;
                const signedInUser = {
                isLoggedIn : true,
                name : displayName ,
                email : email ,
                photo : photoURL ,
                success:true
              } 
              return signedInUser;            
            })
            .catch( error => {
                const newUserInfo = {}               
                newUserInfo.error = error.message;
                newUserInfo.success = false
                return newUserInfo;
              });}

export const forgetPasswordHandeler = (email) => {
    var auth = firebase.auth();    
    auth.sendPasswordResetEmail(email)
    .then( res=>{
               
    }).catch(error => {

    });
}

export const updateUserNameHandeler = (name) => {
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