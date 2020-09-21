import React from 'react';
import './home.css'
import Header from '../../Components/Header/Header';
import Choice from '../Choice/Choice';

const Home = () => {
    return (
        <div className="homeStyle">
            <Header></Header>
            <Choice></Choice>
        </div>
    );
};

export default Home;