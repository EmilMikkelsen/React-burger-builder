import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>Vi håber det smager!</h1>
            <div >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.checkoutCancelled}
            >
                CANCEL
            </Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>
                CONTINUE
            </Button>
        </div>
    );
};

export default checkoutSummary;