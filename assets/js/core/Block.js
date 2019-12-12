/*
  Тут рендарятся блоки нескольких типов за ведомо неизвестно кокой будет на стринице и если в бекенде что то расширят 
  добавят новый блок то тут легко его дописать обратьтся к нему и отрендерить.
*/

import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';
// Styles
import classes from '../../css/Blocks/Block.css';
// Core
import Aux from './Aux';

class Block extends Component {

  componentDidMount () {
    if(this.props.block.data.filter(e => e.key === this.props.blockId).length === 0){
      switch(this.props.type){
        case 'entityCollection':
          this.props.onFetchBlockEntityCollection(this.props.blockId, this.props.bundle.rules);
          break;
        default: 
          this.props.onFetchBlock(this.props.blockId);
          break;
      }
    }
  }

  render() {
    let content = null;

    if(this.props.block.data.filter(e => e.key === this.props.blockId && e.error === false).length > 0){
      const blockData = this.props.block.data.filter(e => e.key === this.props.blockId);
      const SomeComponent = this.props.SomeComponent;
      content = (<SomeComponent {...this.props} blockData={blockData} blockClasses={classes} />);
    }

    return (<Aux>{content}</Aux>);
  }
}

const mapStateToProps = state => {
  return {
    block: state.block
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchBlock: (blockId) => dispatch(actions.getBlock(blockId)),
    onFetchBlockEntityCollection: (blockId, data) => dispatch(actions.getBlockEntityCollection(blockId, data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Block);