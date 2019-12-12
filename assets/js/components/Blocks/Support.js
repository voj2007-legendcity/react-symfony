import React, {Component} from 'react';
// Styles
import classes from '../../../css/Blocks/BlockSupport.css';
import Button from '../UI/Button';
// Forms
import FormSupport from '../Forms/FormSupport';

class BlockSupport extends Component {

  render() {
    return (<div className={classes.BlSupport}>
      <div className="container">
        <div className={[classes.Top, 'row', 'align-items-center'].join(' ')}>
          <div className="col-3">
            <Button 
              classBtn={classes.Close}
              classSkip={true}
              clicked={this.props.close}><i className="fa fa-chevron-right"></i></Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className={[this.props.blockClasses.Container, classes.Container].join(' ')}>
              <FormSupport close={this.props.close} />
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}
export default BlockSupport;