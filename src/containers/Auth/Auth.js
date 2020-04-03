import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

import * as actions from '../../store/actions/index'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';

const Auth = props => {
    const [controls, setControls] = useState({
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
    });
    const [isSignup, setIsSignup] = useState(false);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        };
        setControls(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

    const formElementsArray = [];
    for( let key in controls ) {
        formElementsArray.push({
            id: key,
            config: controls[key]
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
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />
    ));

    if(props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if(props.error) {
        if(props.error.message === 'INVALID_EMAIL') {
            errorMessage = (
                <p className="ErrorMessage">Invalid e-mail</p>
            );
        } else if(props.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
            errorMessage = (
                <p className="ErrorMessage">Too many attempts, try again later</p>
            );
        } else if (props.error.message === 'EMAIL_NOT_FOUND') {
            errorMessage = (
                <p className="ErrorMessage">E-mail not found</p>
            );
        } else if (props.error.message === 'INVALID_PASSWORD') {
            errorMessage = (
                <p className="ErrorMessage">Invalid password</p>
            );
        } else if (props.error.message === 'USER_DISABLED') {
            errorMessage = (
                <p className="ErrorMessage">User is disabled</p>
            );
        } else if (props.error.message === 'EMAIL_EXISTS') {
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
    if(props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
        <div className="Auth">
            {authRedirect}
            <form onSubmit={submitHandler}>
                {errorMessage}
                {form}
                <Button btnType="Success">{isSignup ? 'Create account' : 'Log in'}</Button>
            </form>
            <Button 
                clicked={switchAuthModeHandler}
                btnType="Danger">{isSignup ? 'Already signed up? Log in here' : 'Not registered? Create an account'}
            </Button>
        </div>
    );
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