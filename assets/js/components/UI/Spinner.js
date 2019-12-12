import React from 'react';

import classes from '../../../css/UI/Spinner.css';

const Spinner = (props) =>{ 
  const classesSpinner  = [classes.Spinner, 'd-flex', 'align-items-center', 'h-100'];

  if(props.show){
    classesSpinner.push(classes.Active);
  }

  return (
    <div className={classesSpinner.join(' ')}>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
};
export default Spinner;