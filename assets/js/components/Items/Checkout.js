import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
// Styles
import classes from '../../../css/Items/ItemCheckout.css';
// Core
import Aux from '../../core/Aux';
// Components
import Button from '../UI/Button';
// Forms
import FormCheckout from '../Forms/FormCheckout';

class ItemCheckout extends Component {

  addOrder = (data) => {
    this.props.onAddOrder(localStorage.getItem('cartToken'), data);
  }

  render() {
    return (<div>
      {localStorage.getItem('cartToken') ? <div id="checkout" className={classes.BlCheckout}>
        <FormCheckout addOrder={this.addOrder} />
      </div> : null}
    </div>);
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddOrder: (token, data) => dispatch(actions.addOrder(token, data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemCheckout);