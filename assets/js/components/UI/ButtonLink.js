import React from 'react';
import { Link } from 'react-router-dom';
import {Link as SmoothLink} from "react-scroll";

import classes from '../../../css/UI/ButtonLink.css';

const Button = (props) => {
  const classBtn = [classes.ButtonLink];

  switch(props.typeBtn){
    case 'Primary':
      classBtn.push(classes.Primary);
      break;
  }
  
  return (<div>{props.hasOwnProperty('smooth') ? 
        <SmoothLink className={classBtn.join(' ')} to={props.to} smooth={props.smooth} spy={props.spy}>{props.children}</SmoothLink>: 
        <Link className={classBtn.join(' ')} to={{pathname: props.to, hash:props.hash}}>{props.children}</Link>}</div>);
}
export default Button;