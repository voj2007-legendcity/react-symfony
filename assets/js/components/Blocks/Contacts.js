import React from 'react';
// Styles
import classes from '../../../css/Blocks/BlockContacts.css';
// UI
import Button from '../UI/Button';
// Core
import PageSupport from '../Pages/Support';

const BlockContacts = (props) => {

  const createMarkup = (content) => {
    return {__html: content};
  }

  const onOpenLefSidebar = (event) => {
    props.openLefSidebar((props) => <PageSupport {...props} />, event.target.value);
  }

  return props.blockData.slice(0, props.blockData.length).map(data => {
    return (<div key={data.key} className={props.blockClasses.BlBlock}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={props.blockClasses.Container}>
              <div className="row">
                <div className="col-12 col-lg-5">
                  <div className={classes.Contacts}>
                    <div className={classes.Item}>
                      <a className="phone" href={"tel:" + props.settings.tel.replace(/-/g, '')}>{props.settings.tel} <small className="d-none d-lg-block">по России бесплатно</small></a>
                    </div>
                    <div className={classes.Item}>
                      <a className="phone" href={"tel:" + props.settings.cell.replace(/-/g, '')}>{props.settings.cell}</a>
                    </div>
                    <div className={classes.Item}>
                      <a href={"mailto:" + props.settings.email}>{props.settings.email}</a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-7">
                  <div className={[props.blockClasses.Introtext, classes.Introtext].join(' ')} dangerouslySetInnerHTML={createMarkup(data.state.introtext)}></div>
                  <div className=" text-lg-right">
                    <Button val="feddback" clicked={(event) => onOpenLefSidebar(event)}>Написать в поддержку</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  });
}
export default BlockContacts;