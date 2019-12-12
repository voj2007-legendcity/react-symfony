import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockDiscount.css';
// Forms
import FormDiscount from '../Forms/FormDiscount';

const BlockDiscount = (props) => {

  const createMarkup = (content) => {
    return {__html: content};
  }

  return props.blockData.slice(0, props.blockData.length).map(data => {
    return (<div key={data.key} className={props.blockClasses.BlBlock}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={[props.blockClasses.Container, classes.Container].join(' ')}>
              <div className={[props.blockClasses.Content, classes.Content].join(' ')} dangerouslySetInnerHTML={createMarkup(data.state.content)}></div>
              <div className={[props.blockClasses.Picture, classes.Picture].join(' ')}><img src={require("../../../images/" + data.state.image)} alt={data.state.name} /></div>
              <div className={classes.FormContainer}><FormDiscount /></div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  });
}
export default BlockDiscount;