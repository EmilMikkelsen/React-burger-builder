import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
    return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    })
    return (
        <Aux>
            <h3>Din bestilling</h3>
            <p>En lækker burger med følgende ingredienser:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Forsæt til kassen?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>FORTRYD</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>FORSÆT</Button>
        </Aux>
    );
};

export default orderSummary;