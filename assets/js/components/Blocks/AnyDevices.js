import React from 'react';

const BlockAnyDevices = (props) => {

  const createMarkup = (content) => {
    return {__html: content};
  }

  return props.blockData.slice(0, props.blockData.length).map(data => {
    return (<div key={data.key} className={props.blockClasses.BlBlock}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={props.blockClasses.Container}>
              <div className="row align-items-center">
                <div className="col-12 col-lg-7">
                  <div className={props.blockClasses.Bname}>{data.state.name}</div>
                  <div className={props.blockClasses.Content} dangerouslySetInnerHTML={createMarkup(data.state.content)}></div>
                </div>
                <div className="col-12 col-lg-5">
                  <img src={require("../../../images/" + data.state.image)} alt={data.state.name} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  });
}
export default BlockAnyDevices;