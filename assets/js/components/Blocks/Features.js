import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockFeatures.css';

const BlockFeatures = (props) => (
  props.blockData.slice(0, props.blockData.length).map(data => {
    const fieldCollection = JSON.parse(data.state.fieldCollection);
    return (<div key={data.key} className={classes.BlFeatures}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className={props.blockClasses.BlName}>{data.state.name}</div>
            <div className={props.blockClasses.BlIntrotext}>{data.state.introtext}</div>
          </div>
        </div>
        <div className="row">
          {Object.keys(fieldCollection).map(key => {
            return (
              <div key={key} className="col-12 col-md-6 col-lg-4 mb-5">
                <div className="d-flex">
                  <div className={classes.Icon}>
                    {fieldCollection[key].image ? <img src={require("../../../images/" + fieldCollection[key].image.value)} alt={fieldCollection[key].name.value} /> : ''}
                  </div>
                  <div className={classes.FeatureText}>
                    <div className={props.blockClasses.Sname}>{fieldCollection[key].name.value}</div>
                    <div className={props.blockClasses.Introtext}>{fieldCollection[key].introtext.value}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>);
  })
)
export default BlockFeatures;