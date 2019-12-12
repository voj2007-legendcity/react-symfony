import React, { Component } from 'react';
// Styles
import classes from '../../../css/UI/Leftsidebar.css';
// Core
import Aux from '../../core/Aux';
import Backdrop from './Backdrop';

class Leftsidebar extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.open !== this.props.open || nextProps.children !== this.props.children;
  }

  componentDidUpdate (prevProps, prevState) {
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.open}  clicked={this.props.close} />
        <div
          className={classes.BlLeftsidebar}
          style={{
            transform: this.props.open ? 'translateX(0)' : 'translateX(105%)'
          }}
          >
            {this.props.content}
        </div>
      </Aux>
    )
  }
}
export default Leftsidebar;