import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // Kan godt gøres til en functional component
    componentDidUpdate() {
        console.log('[OrderSummary] DidUpdate');
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>);
        });

        return (
            <Aux>
                <h3>Din bestilling</h3>
                <p>En lækker burger med følgende ingredienser:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Forsæt til kassen?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>FORTRYD</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>FORSÆT</Button>
            </Aux>
        );
    }
}

export default OrderSummary;