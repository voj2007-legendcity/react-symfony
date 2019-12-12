import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockAbout.css';

const BlockAbout = (props) => (
  props.blockData.slice(0, props.blockData.length).map(data => {
    const fieldCollection = JSON.parse(data.state.fieldCollection);
    return (<div key={data.key} className={props.blockClasses.BlBlock}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={[props.blockClasses.Container, classes.Container].join(' ')}>
              {Object.keys(fieldCollection).map(key => {
                return (<div key={key} className="row align-items-center">
                  <div className="col-12 col-lg-5 mb-3 mb-lg-0">
                    <div className={props.blockClasses.Bname}>{fieldCollection[key].name.value}</div>
                    <div className={props.blockClasses.Introtext}>{fieldCollection[key].introtext.value}</div>
                  </div>
                  <div className="col-12 col-lg-7">
                    {fieldCollection[key].image ? <img src={require("../../../images/" + fieldCollection[key].image.value)} alt={fieldCollection[key].name.value} /> : ''}
                  </div>
                </div>);
              })}
            </div>
          </div>
        </div>
      </div>
    </div>);
  })
);
export default BlockAbout;