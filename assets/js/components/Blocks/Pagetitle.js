import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockPagetitle.css';

const BlockPagetitle = (props) =>  {
  let pagetitleClasses = [classes.BlPagetitle];

  if(props.conditions !== null){
    props.conditions.classes.map(key => {
      pagetitleClasses.push(classes[key]);
    });
  }
  
  return (<div className={pagetitleClasses.join(' ')}>
    <div className="container">
      <div className="row">
      <div className="col-12">
        <div className={[classes.Container, 'd-flex', 'justify-content-center', 'text-white', 'flex-column'].join(' ')}>
          <h1 className={classes.Pagetitle}>{props.pagetitle}</h1>
          <div className={classes.Introtext}>{props.introtext}</div>
        </div>
      </div>
      </div>
    </div>
  </div>);
}
export default BlockPagetitle;