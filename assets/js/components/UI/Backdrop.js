import React from 'react';
// Styles
import classes from '../../../css/UI/Backdrop.css';

const Backdrop = (props) => (
  <div 
    className={classes.Backdrop} 
    onClick={props.clicked}
    style={{
      opacity: props.show ? '1' : '0',
      zIndex: props.show ? '99998' : '-99'
    }} ></div>
);
export default Backdrop;