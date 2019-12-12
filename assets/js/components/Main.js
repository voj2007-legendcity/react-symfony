import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import * as actions from '../store/actions';
// Core
import Aux from '../core/Aux';
import Axios from '../core/Axios';
import WithErrorHandler from '../core/WithErrorHandler';
// Components
import Header from './Header';
import Footer from './Footer';
// Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Courses from './Pages/Courses/Courses';
import Contacts from './Pages/Contacts';
import Policy from './Pages/Policy';
import PaymentAndReturns from './Pages/PaymentAndReturns';
import Discount from './Pages/Discount';
import Cart from './Pages/Cart';
import Thanks from './Pages/Thanks';


// Styles
import classes from '../../css/Main.css';

const Main = (props) => {

  useEffect(() => props.onFetchSettings(), []);

  return (
    <Aux className={classes.Main}>
      <Header tel={props.settings.tel} email={props.settings.email} logo={props.settings.logo} />
      <Switch>
        <Route path="/thanks" render={() => <Thanks {...props} />} />
        <Route path="/cart" render={() => <Cart {...props} />} />
        <Route path="/discount" render={() => <Discount {...props} />} />
        <Route path="/about" render={() => <About {...props} />} />
        <Route path="/policy" render={() => <Policy {...props} />} />
        <Route path="/payment-and-returns" render={() => <PaymentAndReturns {...props} />} />
        <Route path="/courses" render={() => <Courses {...props} openLefSidebar={props.openLefSidebar} />} />
        <Route path="/contacts" render={() => <Contacts {...props} openLefSidebar={props.openLefSidebar} />} />
        <Route path="/" render={() => <Home {...props} openLefSidebar={props.openLefSidebar} />} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Aux>
  );
}
const mapStateToProps = state => {
  return {
    settings: state.settings.data,
    error: state.settings.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchSettings: () => dispatch(actions.getSettings())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Main, Axios)));