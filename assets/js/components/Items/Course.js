import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
// Styles
import classes from '../../../css/Items/ItemCourse.css';
// Core
import PageCourse from '../Pages/Courses/Course';
// UI
import Button from '../UI/Button';

class ItemCourse extends Component {
  state = {
    productsInCart: []
  }

  componentDidMount(){
    if(localStorage.getItem('productsInCart')){
      this.setState({
        productsInCart: localStorage.getItem('productsInCart').split(',')
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(localStorage.getItem('productsInCart') && this.state.productsInCart.length !== localStorage.getItem('productsInCart').split(',').length){
      this.setState({
        productsInCart: localStorage.getItem('productsInCart').split(',')
      })
    }
  }

  addToCart = (even) => {
    const data = new FormData();
    data.append('id', even.target.value);
    data.append('token', localStorage.getItem('cartToken') ? localStorage.getItem('cartToken') : 0);
    this.props.onAddToCart(data);
  }

  createMarkup = (content) => {
    return {__html: content};
  }

  onOpenLefSidebar = (event) => {
    this.props.openLefSidebar((props) => <PageCourse {...props} />, event.target.value);
  }
  
  render() {
    let courseClasses = [classes.Course, 'px-4', 'text-center'];
  
    if(this.props.product.popular){
      courseClasses.push(classes.Popular);
    }

    return (
      <div className="h-100">
        <div className={courseClasses.join(' ')}>
          {this.props.product.popular ? (
            <div className={classes.Best}>
              <i className="fa fa-star"></i> Best <i className="fa fa-star"></i>
            </div>
            ) : null }  
          <div className={classes.Name}>{this.props.product.name}</div>
          <div className={classes.Duration}>срок обучения {this.props.product.duration}</div>
          <div className={classes.Price}>
            {this.props.product.productPrices.map((price, index) => {
              if(price.priceType.id === 1){
                return price.price;
              }
            })}  руб.
            <small>/в месяц</small>
          </div>
          <div className={[classes.Button, 'button', 'mb-4'].join(' ')}>
            <Button 
              uniqueKey={this.props.product.id} 
              disabledState={this.state.productsInCart.includes(
                this.props.product.productPrices[0].id.toString()
              ) ? true : false}
              classBtn="w-100"
              val={this.props.product.productPrices[0].id}
              clicked={(event) => this.addToCart(event)}>{this.state.productsInCart.includes(
                this.props.product.productPrices[0].id.toString()
              ) ? (<span>Месяц обучения курса<small>Добавлен в корзину</small></span>) : 'Пройти курс'}</Button>
          </div>
          <div className={[classes.Button, 'button', 'success', 'mb-4'].join(' ')}>
            <Button 
              uniqueKey={this.props.product.id} 
              disabledState={this.state.productsInCart.includes(
                this.props.product.productPrices[1].id.toString()
              ) ? true : false}
              classBtn="w-100"
              typeBtn="Success"
              val={this.props.product.productPrices[1].id}
              clicked={(event) => this.addToCart(event)}>
                {this.state.productsInCart.includes(
                this.props.product.productPrices[1].id.toString()
              ) ? (<span>Пробный урок<small>Добавлен в корзину</small></span>) : 'Попробовать один урок'}</Button>
          </div>
          <div className={[classes.Introtext, 'text-left', 'mb-4'].join(' ')} dangerouslySetInnerHTML={this.createMarkup(this.props.product.introtext)}></div>
          <div className={classes.Bottom}>
            <div className={[classes.Button, 'button', 'mb-4'].join(' ')}>
              <Button 
                uniqueKey={this.props.product.id} 
                classBtn="w-100"
                val={this.props.product.alias}
                clicked={(event) => this.onOpenLefSidebar(event)}>Подробное описание</Button>
            </div>
            <div className={[classes.Salary, 'mb-4', 'pt-4'].join(' ')}>Средняя зарплата по России<br /><b>{this.props.product.salary}</b> руб/мес</div>
            <div className={classes.PaymentConditions}><small>{this.props.product.paymentConditions}</small></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: (id) => dispatch(actions.addToCart(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemCourse);