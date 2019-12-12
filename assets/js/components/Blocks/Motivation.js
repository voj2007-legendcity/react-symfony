import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockMotivation.css';

const BlockMotivation = (props) => {

  const createMarkup = (content) => {
    return {__html: content};
  }

  return props.blockData.slice(0, props.blockData.length).map(data => {
    return (<div key={data.key} className={classes.BlMotivation}>
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-4">
          <h1 className={[props.blockClasses.Bname, classes.Bname].join(' ')}>{data.state.name}</h1>
          <div className={props.blockClasses.Introtext}>{data.state.introtext}</div>
        </div>
        <div className="col-12 col-md-8 pl-lg-5">
          <div className={props.blockClasses.Content} dangerouslySetInnerHTML={createMarkup(data.state.content)}></div>
        </div>
      </div>
    </div>
  </div>);
  });

}
export default BlockMotivation;