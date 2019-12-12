import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockAdvantages.css';
// UI
import ButtonLink from '../UI/ButtonLink';

const BlockAdvantages = (props) => {

  const createMarkup = (content) => {
    return {__html: content};
  }

  return props.blockData.slice(0, props.blockData.length).map(data => {
    return (<div key={data.key} className={classes.BlAdvantages}>
      <div className="container">
        <div className="row align-items-center mb-0">
          <div className="col-12 col-md-6">
            {data.state.image ? <img src={require("../../../images/" + data.state.image)} alt={data.state.name} /> : ''}
          </div>
          <div className="col-12 col-md-6">
            <div className={props.blockClasses.Bname}>{data.state.name}</div>
            <div className={props.blockClasses.Content} dangerouslySetInnerHTML={createMarkup(data.state.content)}></div>
            <ButtonLink typeBtn="Primary" to="courses" smooth="500" spy={true}>Пройти курс</ButtonLink>
          </div>
        </div>
      </div>
    </div>);
  });
}
export default BlockAdvantages;