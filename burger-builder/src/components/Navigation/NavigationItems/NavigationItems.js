import React from 'react';
import './NavigationItems.css';

const navigationItems = () => (
    <ul className="NavigationItems">
        <li>
            <a href="/" className="active">Burger builder</a>
        </li>
        <li>
            <a href="/">Checkout</a>
        </li>
    </ul>
);

export default navigationItems;