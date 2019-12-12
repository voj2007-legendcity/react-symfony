import React, { Component } from 'react';
// Styles
import classes from '../../../css/UI/Modal.css';
// Core
import Aux from '../../core/Aux';

class Modal extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render () {
    return (
      <Aux>
        <div
          className={[classes.Modal, classes[this.props.type]].join(' ')}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100px)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.type === 'Error' && this.props.show ? this.props.children.response.data.message : this.props.children}
        </div>
      </Aux>
    )
  }
}
export default Modal;