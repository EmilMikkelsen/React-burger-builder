import React, { useEffect, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './components/UI/Spinner/Spinner';

import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
  const { onTryAutoLogin } = props;
  
  useEffect(() => {
    onTryAutoLogin();
  }, [onTryAutoLogin]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  );

  if(props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
