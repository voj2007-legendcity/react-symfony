import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
// Styles
import classes from '../../../css/Items/ItemCart.css';
// Core
import Aux from '../../core/Aux';
// Components
import Button from '../UI/Button';
// Forms
import FormPromoCode from '../Forms/FormPromoCode';

class ItemCart extends Component {

  componentDidMount(){
    if(localStorage.getItem('cartToken')){
      this.props.onFetchCart(localStorage.getItem('cartToken'));
    }
  }

  removeItem = (event) => {
    this.props.onDeleteProduct(localStorage.getItem('cartToken'), event.target.value);
  } 

  removePromoCode = () => {
    this.props.onDeletePromocode(localStorage.getItem('cartToken'));
  }

  addPromoCode = (promoCode) => {
    const data = new FormData();
    data.append('promocode', promoCode);
    this.props.onAddPromocode(localStorage.getItem('cartToken'), data);
  }

  render() {
    let content = (<div className={classes.Empty}>Ваша корзина пуста!</div>);

    if(this.props.cart.data && this.props.cart.data.hasOwnProperty('products') && this.props.cart.data.products.length > 0){
      content = (<div className="row">
        <div className="col-12 col-lg-7">
          {this.props.cart.data.hasOwnProperty('products') ? this.props.cart.data.products.map((data, index) => {
            return (<div key={index} className={classes.Product}>
              <div className={[this.props.blockClasses.Sname, classes.Sname].join(' ')}>{data.name}</div>
              <div className={[this.props.blockClasses.Introtext, classes.Introtext].join(' ')}>Продолжительность всего курса {data.duration}</div>
              <div className={classes.Description}>Оплата за {data.description.toLowerCase()}</div>
              <div className={classes.Prices}>
                {data.newPrice ? <div className={classes.Price}>{data.newPrice} руб. <small>{data.price} руб.</small></div> : <div className={classes.Price}>{data.price} руб.</div>}
              </div>
              <Button 
                typeBtn="Remove"
                val={data.id}
                clicked={(event) => this.removeItem(event)}>&times;</Button>
            </div>);
          }) : null}
        </div>
        <div className="col-12 col-lg-5 text-center">
          <div className={classes.Container}>
            <div className={classes.Total}>Итого: {this.props.cart.data.total} руб.</div>
            {this.props.cart.data.discount ? <div className={classes.Discount}>Скидка: {this.props.cart.data.discount} руб.</div> : null}
            {this.props.cart.data.promoCode ? 
              <div className={classes.PromoCode}>
                {this.props.cart.data.promoCode}<small>промокод</small>
                <Button 
                  typeBtn="Remove"
                  clicked={this.removePromoCode}>&times;</Button>
                </div> 
              : null}
          </div>
        </div>
        <div className="col-12">
          <div className={this.props.blockClasses.Footer}>
            <div id="promocode" className="row">
              <div className="col-12 col-lg-7 mb-3 mb-lg-0">
                <FormPromoCode 
                  addPromoCode={this.addPromoCode}
                  promoCode={this.props.cart.data.promoCode ? this.props.cart.data.promoCode 
                  : null} />
              </div>
              <div className="col-12 col-lg-5 text-lg-right">
                {this.props.showNextButton ? <Button clicked={this.props.showCheckout}>Прродолжить</Button> : null}
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (<Aux>{content}</Aux>);
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchCart: (token) => dispatch(actions.getCart(token)),
    onDeletePromocode: (token) => dispatch(actions.deletePromocode(token)),
    onAddPromocode: (token, promocode) => dispatch(actions.addPromocode(token, promocode)),
    onDeleteProduct: (token, id) => dispatch(actions.deleteProduct(token, id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemCart);