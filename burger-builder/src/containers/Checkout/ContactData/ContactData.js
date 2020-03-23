import React, { Component } from 'react';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state= {
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
            zipcode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Emil Mikkelsen',
                address: {
                    street: 'Karlemosevej 99',
                    zipcode: '4600',
                    country: 'Denmark'
                },
                email: 'Emilowitz97@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

       axios.post('/orders.json', order)
       .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
       })
       .then(error => {
           this.setState({loading: false});
       });
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Dit navn" />
                <input type="email" name="email" placeholder="Din email" />
                <input type="text" name="zipcode" placeholder="Post nr." />
                <input type="text" name="city" placeholder="By" />
                <input type="text" name="street" placeholder="Gade" />
                <Button btnType="Success" clicked={this.orderHandler}>Bestil</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner />;
        }

        return ( 
            <div className="ContactData">
                <h4>Indtast dine oplysninger her</h4>
                {form}
            </div>
        );
    }
};

export default ContactData;