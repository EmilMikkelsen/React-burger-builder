import React from 'react';
import './Order.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span className="SelectedIngredients" key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className="Order">
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)} kr.</strong></p>
            {/* <p>Name: ??</p>
            <p>Address: ??</p>
            <p>Email: ??</p> */}
        </div>
    );
}

export default order;