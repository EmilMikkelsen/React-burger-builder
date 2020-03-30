import React from 'react';
import './NavigationItems.css';
import { NavLink } from 'react-router-dom';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <li>
            <NavLink to="/" exact>Burger builder</NavLink>
        </li>
        { props.isAuthenticated 
            ? <li><NavLink to="/orders">Orders</NavLink></li>
            : null
        }
        <li>
            { !props.isAuthenticated
                ? <NavLink to="/auth">Log in</NavLink>
                : <NavLink to="/logout">Log out</NavLink> 
            }
        </li>
    </ul>
);

export default navigationItems;