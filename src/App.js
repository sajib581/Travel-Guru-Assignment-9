import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'fontsource-roboto';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NoMatch from './Components/NoMatch/NoMatch';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Review from './Components/Review/Review';

export const SelectContext = createContext()
function App() {
  const [select,setSelect] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({}) ;
  return (
    <SelectContext.Provider value={[select,setSelect,loggedInUser, setLoggedInUser]}>
      <Router>      
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/review">
            <Review></Review>
          </PrivateRoute>          
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>      
    </Router>
    </SelectContext.Provider>
  );
}

export default App;
