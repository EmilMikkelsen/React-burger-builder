import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

import * as actions from '../../store/actions/index'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const formElementsArray = [];
        for( let key in this.state.controls ) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if(this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if(this.props.error) {
            if(this.props.error.message === 'INVALID_EMAIL') {
                errorMessage = (
                    <p className="ErrorMessage">Invalid e-mail</p>
                );
            } else if(this.props.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                errorMessage = (
                    <p className="ErrorMessage">Too many attempts, try again later</p>
                );
            } else if (this.props.error.message === 'EMAIL_NOT_FOUND') {
                errorMessage = (
                    <p className="ErrorMessage">E-mail not found</p>
                );
            } else if (this.props.error.message === 'INVALID_PASSWORD') {
                errorMessage = (
                    <p className="ErrorMessage">Invalid password</p>
                );
            } else if (this.props.error.message === 'USER_DISABLED') {
                errorMessage = (
                    <p className="ErrorMessage">User is disabled</p>
                );
            } else if (this.props.error.message === 'EMAIL_EXISTS') {
                errorMessage = (
                    <p className="ErrorMessage">E-mail exists</p>
                );
            } else {
                errorMessage = (
                    <p className="ErrorMessage">Error</p>
                );
            }
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className="Auth">
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to {this.state.isSignup ? 'sign in' : 'sign up'}
                </Button>
            </div>
        );
    }
}

const mapStateToprops = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToprops = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToprops, mapDispatchToprops)(Auth);