import React from 'react';

import classes from '../../../css/UI/Button.css';

const Button = (props) => {
  const classBtn = props.classSkip ? [props.classBtn] : [classes.Button, props.classBtn];

  switch(props.typeBtn){
    case 'Success':
      classBtn.push(classes.Success);
      break;
    case 'Danger':
      classBtn.push(classes.Danger);
      break;
    case 'Remove':
      classBtn.push(classes.Remove);
      break;
  }
  
  return (
    <button
        key={props.uniqueKey}
        disabled={props.disabledState}
        className={classBtn.join(' ')}
        value={props.val}
        onClick={props.clicked}>{props.children}</button>
    );
}

export default Button;