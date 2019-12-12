import React from 'react';

const BlockThanks = (props) => {

  const createMarkup = (content) => {
    return {__html: content};
  }

  return props.blockData.slice(0, props.blockData.length).map(data => {
    return (<div key={data.key} className={props.blockClasses.BlBlock}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={props.blockClasses.Container}>
              <div className={props.blockClasses.Content} dangerouslySetInnerHTML={createMarkup(data.state.content)}></div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  });
}
export default BlockThanks;