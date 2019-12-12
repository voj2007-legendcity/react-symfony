import React from 'react';
// UI
import ButtonLink from '../UI/ButtonLink';

const BlockBeginFreelans = (props) => (
  props.blockData.slice(0, props.blockData.length).map(data => {
    return (<div key={data.key} className={props.blockClasses.BlBlock}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={props.blockClasses.Container}>
              <div className="row align-items-center">
                <div className="col-12 col-lg-5">
                  <div className={props.blockClasses.Bname}>{data.state.name}</div>
                  <ButtonLink to="/courses" typeBtn="Primary">Пройти курс</ButtonLink>
                </div>
                <div className="col-12 col-lg-7">
                  <img src={require("../../../images/" + data.state.image)} alt={data.state.name} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  })
);
export default BlockBeginFreelans;