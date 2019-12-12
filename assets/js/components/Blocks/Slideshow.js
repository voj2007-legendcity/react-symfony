import React, {Component} from 'react';
// Styles
import classes from '../../../css/Blocks/BlockSlideshow.css';
// UI
import ButtonLink from '../UI/ButtonLink';

class BlockSlideshow extends Component {
  state = {
    active: true
  }
  
  intervalID = 0;

  componentDidMount () {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(() => {
      this.setState({active: !this.state.active});
    }, 7000);
  }

  createMarkup = (content) => {
    return {__html: content};
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return this.props.blockData.slice(0, this.props.blockData.length).map(data => {
      const fieldCollection = JSON.parse(data.state.fieldCollection);

      return (<div key={data.key} className={classes.BlSlideshow}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={classes.List}>
                {Object.keys(fieldCollection).map(key => {
                  let cssClasses = [classes.Slide, 'd-flex', 'h-100', 'align-items-center'];
          
                  if(key == 'collection_1' && this.state.active){
                    cssClasses.push(classes.Active);
                  }
                  if(key != 'collection_1' && !this.state.active){
                    cssClasses.push(classes.Active);
                  }
          
                  return (<div key={key} className={cssClasses.join(' ')}>
                    <div className="container">
                      <div className="row">
                        <div className="col-12 col-md-9 col-lg-7 pb-5">
                          <div className={[classes.WelcomeText, 'mb-50'].join(' ')}>
                            <div className={classes.Name} dangerouslySetInnerHTML={this.createMarkup(fieldCollection[key].name.value)}></div>
                            <div className={classes.Introtext} dangerouslySetInnerHTML={this.createMarkup(fieldCollection[key].introtext.value)}></div>
                            <div className={classes.Description} dangerouslySetInnerHTML={this.createMarkup(fieldCollection[key].description.value)}></div>
                            <div className={[classes.Button, 'button'].join(' ')}><ButtonLink to="courses" smooth="500" spy={true}>Пройти курс</ButtonLink></div>
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-lg-5">
                          {fieldCollection[key].image ? <img className={[classes.Image, 'img-fluid'].join(' ')} src={require("../../../images/" + fieldCollection[key].image.value)} alt={fieldCollection[key].name.value} /> : ''}
                        </div>
                      </div>
                    </div>
                  </div>);
                })}
              </div>
              <div className={classes.Clouds}>
                <img src={require("../../../images/cloud-1.png")} alt="" className={[classes.Cloud1, classes.Cloud].join(' ')} />
                <img src={require("../../../images/cloud-2.png")} alt="" className={[classes.Cloud2, classes.Cloud].join(' ')} />
                <img src={require("../../../images/cloud-3.png")} alt="" className={[classes.Cloud3, classes.Cloud].join(' ')} />
                <img src={require("../../../images/cloud-4.png")} alt="" className={[classes.Cloud4, classes.Cloud].join(' ')} />
                <img src={require("../../../images/cloud-5.png")} alt="" className={[classes.Cloud5, classes.Cloud].join(' ')} />
              </div>
            </div>
          </div>
        </div>
      </div>);
    });
  }
}
export default BlockSlideshow;