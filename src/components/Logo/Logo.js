import React from 'react';
import { Link } from 'react-router-dom';
import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

const logo = (props) => (
    <Link to="/" className="Logo">   
        <img src={burgerLogo} alt="MyBurger" />
    </Link>
);

export default logo;