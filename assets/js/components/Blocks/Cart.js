import React, {Component} from 'react';
// Styles
import classes from '../../../css/Blocks/BlockCart.css';
// Components
import ItemCart from '../Items/Cart';
import ItemCheckout from '../Items/Checkout';

class BlockCart extends Component {
  state = {
    showCheckout: false,
    showNextButton: true
  }

  showCheckoutHandler = () => {
    this.setState({
      showCheckout: true,
      showNextButton: false
    });
    setTimeout(() => {
      const el = document.getElementById('checkout').getBoundingClientRect();
      window.scrollBy({ top: el.top - 30, behavior: 'smooth' });
    }, 100);
  }

  render() {
    // localStorage.removeItem('cartToken');
    // localStorage.removeItem('productsInCart');
    return this.props.blockData.slice(0, this.props.blockData.length).map(data => {
      return (<div key={data.key} className={this.props.blockClasses.BlBlock}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={[this.props.blockClasses.Container, classes.Container].join(' ')}>
              <ItemCart 
                blockClasses={this.props.blockClasses} 
                showCheckout={this.showCheckoutHandler} 
                showNextButton={this.state.showNextButton} />
              {this.state.showCheckout ? <ItemCheckout /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>);
    })
  }
}
export default BlockCart;