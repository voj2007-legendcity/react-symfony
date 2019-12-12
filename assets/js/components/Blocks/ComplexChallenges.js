import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockComplexChallenges.css';
// UI
import ButtonLink from '../UI/ButtonLink';

const BlockComplexChallenges = (props) => (
  props.blockData.slice(0, props.blockData.length).map(data => {
    const fieldCollection = JSON.parse(data.state.fieldCollection);
    return (<div key={data.key} className={props.blockClasses.BlBlock}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className={props.blockClasses.Container}>
              <div className={props.blockClasses.Bname}>{data.state.name}</div>
              <div className={props.blockClasses.Introtext}>{data.state.introtext}</div>
              <div className={[props.blockClasses.Picture, classes.Picture].join(' ')}><img src={require("../../../images/" + data.state.image)} alt={data.state.name} /></div>
              <div className="row">
              {Object.keys(fieldCollection).map(key => {
                return (
                  <div key={key} className="col-12 col-md-6 col-lg-4 mb-5">
                    <div className={props.blockClasses.Sname}>{fieldCollection[key].name.value}</div>
                    <div className={props.blockClasses.Introtext}>{fieldCollection[key].introtext.value}</div>
                  </div>
                );
              })}
              </div>
              <div className="d-flex justify-content-center">
                <ButtonLink typeBtn="Primary" to="courses" smooth="500" spy={true}>Пройти курс</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  })
);
export default BlockComplexChallenges;