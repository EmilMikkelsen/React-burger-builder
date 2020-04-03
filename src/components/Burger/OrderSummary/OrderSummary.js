import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

// Kan godt gøres til en functional component
const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
    return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    });

    return (
        <Aux>
            <h3>Your order</h3>
            <p>a delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>{props.price.toFixed(2)} kr.</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary;