import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockHappyClients.css'

const BlockHappyClients = (props) => {
  
  const createMarkup = (content) => {
    return {__html: content};
  }

  return props.blockData.slice(0, props.blockData.length).map(data => {
    const conditions = props.bundle.conditions[props.alias] ? props.bundle.conditions[props.alias] : null;
    const blockClasses = [classes.BlHappyClients];

    if(conditions !== null && typeof conditions.classes !== 'undefined'){
      blockClasses.push(classes[conditions.classes]);
    }

    return (<div key={data.key} className={blockClasses.join(' ')}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className={classes.Introtext} dangerouslySetInnerHTML={createMarkup(data.state.introtext)}></div>
          </div>
        </div>
      </div>
    </div>);
  });
}
export default BlockHappyClients;