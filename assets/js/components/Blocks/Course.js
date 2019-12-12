import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
// Styles
import classes from '../../../css/Blocks/BlockCourse.css';
// Core
import Aux from '../../core/Aux';
// Components
import Button from '../UI/Button';

class BlockCourse extends Component {
  state = {
    productsInCart: []
  }

  intervalID = 0;

  componentDidMount(){
    const fields = [
      'id',
      'alias',
      'name',
      'content',
      'duration',
      'salary',
      'popular',
      'productPrices'
    ];
    
    if(this.props.product.data.filter(e => e.key === this.props.entityId).length === 0){
      this.props.onFetchProduct(this.props.entityId, fields);
    }

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

  createMarkup = (content) => {
    return {__html: content};
  }

  addToCart = (even) => {
    const data = new FormData();
    data.append('id', even.target.value);
    data.append('token', localStorage.getItem('cartToken') ? localStorage.getItem('cartToken') : 0);
    this.props.onAddToCart(data);
  }

  render() {
    let content = null;

    if(this.props.product.data.filter(e => e.key === this.props.entityId && e.error === false).length > 0){
      const product = this.props.product.data.filter(e => e.key === this.props.entityId);
      content = product.slice(0, product.length).map(data => {
        let productClass = [classes.BlCourse];

        return (
          <div key={data.state.id} className={productClass.join(' ')}>
            <div className="container">
              <div className={[classes.Top, 'row', 'align-items-center'].join(' ')}>
                <div className="col-3">
                  <Button 
                    uniqueKey={data.state.id} 
                    classBtn={classes.Close}
                    classSkip={true}
                    clicked={this.props.close}><i className="fa fa-chevron-right"></i></Button>
                </div>
                <div className="col-9 d-none d-md-block">
                  <div className="d-flex align-items-center justify-content-end">
                    {data.state.productPrices.map(data => {
                      let buttonType = '';
    
                      if(data.priceType.id != 1){
                        buttonType = 'Success';
                      }
    
                      return (
                        <div key={data.id}>
                          <Button 
                            disabledState={this.state.productsInCart.includes(data.id.toString()) ? true : false}
                            uniqueKey={data.id} 
                            val={data.id} 
                            classBtn={classes.Button}
                            typeBtn={buttonType}
                            clicked={(event) => this.addToCart(event)}>
                              {data.priceType.id === 1 ? 'Весь курс за '+ data.price +' руб/мес' : 'Один урок за '+ data.price +' руб'}
                              {this.state.productsInCart.includes(data.id.toString()) ? <small>Добавлен в корзину</small> : null}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className={[this.props.blockClasses.Container, classes.Container].join(' ')}>
                    <div className={[this.props.blockClasses.Bname,  classes.Bname].join(' ')}>{data.state.name}</div>
                    <div className={classes.Duration}>срок обучения {data.state.duration}</div>
                    <div className={this.props.blockClasses.Content} dangerouslySetInnerHTML={this.createMarkup(data.state.content)}></div>
                    <div className={classes.Salary}>После прохождения курса вы сможете зарабатывать не меньше чем <span>{data.state.salary}</span> рублей в месяц</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <Aux>{content}</Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    product: state.product,
    cart: state.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchProduct: (id, fields) => dispatch(actions.getProduct(id, fields)),
    onAddToCart: (id) => dispatch(actions.addToCart(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BlockCourse);