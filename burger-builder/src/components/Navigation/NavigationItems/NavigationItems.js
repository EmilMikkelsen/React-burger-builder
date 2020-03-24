import React from 'react';
import './NavigationItems.css';
import { NavLink } from 'react-router-dom';

const navigationItems = () => (
    <ul className="NavigationItems">
        <li>
            <NavLink to="/" exact>Burger builder</NavLink>
        </li>
        {/* <li>
            <NavLink to="/checkout">Checkout</NavLink>
        </li> */}
        <li>
            <NavLink to="/orders">Orders</NavLink>
        </li>
    </ul>
);

export default navigationItems;