import React from 'react';
import { NavLink } from 'react-router-dom';
// Styles
import classes from '../../../css/Blocks/BlockCourses.css';
// Components
import ItemCourse from '../Items/Course';

const BlockCourses = (props) => {

  const createMarkup = (content) => {
    return {__html: content};
  }

  return props.blockData.slice(0, props.blockData.length).map(data => {
    const conditions = props.bundle.conditions[props.alias] ? props.bundle.conditions[props.alias] : null;
    const blockClasses = [props.blockClasses.BlBlock, classes.BlCourses];

    
    if(conditions !== null && typeof conditions.classes !== 'undefined'){
      blockClasses.push(classes[conditions.classes]);
    }

    return(
      <div id="courses" key={data.key} className={blockClasses.join(' ')}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={[props.blockClasses.Container, classes.Container].join(' ')}>
                {conditions !== null && conditions.showName === true ? <div className={props.blockClasses.BlName}>{data.state.name}</div> : null}
                {conditions !== null && conditions.showIntrotext === true ? <div className={props.blockClasses.BlIntrotext}>{data.state.introtext}</div> : null}
                <div className="row">
                {data.state.fieldCollection.map(product => {
                  return (
                    <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
                      <ItemCourse product={product} openLefSidebar={props.openLefSidebar} />
                    </div>
                  );
                })}
                </div>
                <div className={classes.Info}>
                  <div className={props.blockClasses.Content} dangerouslySetInnerHTML={createMarkup(data.state.content)}></div>
                  <NavLink className={props.blockClasses.Link} to="/discount">Получить скидку</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
export default BlockCourses;