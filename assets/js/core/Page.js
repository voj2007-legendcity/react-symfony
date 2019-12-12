/*
  В этом коде ничего особенного, но задача была в том что бы из админки мобно было назначать блоки на странице 
  и их позицию. Код получился компактным. В этом подходе можно переопределять стили, задавать какието условия для 
  выборки данных из базу например поля по умолчанию вытащить или обратиться к определенному API который в бекенде.
  Сразу импортируются блоки, но так как все они рендерятся один раз и все хранятся в массиве то нагрузка подает при 
  постормом обрщении к странице. Уже все вытаскивается из массива.
*/

import React from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';

import * as actions from '../store/actions';
// Core
import Aux from './Aux';
import PageSettings from './PageSettings';
// Styles
import classesPage from '../../css/Pages/Page.css';
// Components
import BlockPagetitle from '../components/Blocks/Pagetitle';
// Core
import Block from './Block';
// IU
import Spinner from '../components/UI/Spinner';

class Page extends PageSettings {

  render() {
    let blocks = null;
    const spinner = this.props.spinner === true && this.state.spinner === true ? <Spinner show={this.state.spinner} /> : null;

    if(this.props.page.data.filter(e => e.key === this.props.alias).length > 0){
      const steteBlocks = this.state.blocks;
      const page = this.props.page.data.filter(e => e.key === this.props.alias);
      blocks = page.slice(0, page.length).map(data => {
        let pageClass = Array.isArray(this.state.styels[data.key]) ? this.state.styels[data.key] : [this.state.styels[data.key]];
        pageClass.push(classesPage.Page);

        return (
          <div key={data.key} className={pageClass.join(' ')}>
            {this.props.skipMeta === true ? null : <Helmet>
              <title>{data.state.longtitle}</title>
              <meta name="description" content={data.state.description} />
              <meta name="keywords" content={data.state.keywords} />
            </Helmet>}
            {this.props.skipPagetitle === true ? null : <BlockPagetitle 
              pagetitle={data.state.hasOwnProperty('title') ? data.state.title : data.state.longtitle}
              introtext={data.state.hasOwnProperty('introtext') ? data.state.introtext : null}
              conditions={this.state.pagetitle.conditions.hasOwnProperty(data.key) ? this.state.pagetitle.conditions[data.key] : null}
              />}
            {data.state.pageBlocks.map((block, index) => {
              const blockId = block.block.blockId;

              return (<div key={index}>
                {<Block 
                  {...this.props} 
                  blockId={blockId} 
                  SomeComponent={steteBlocks[blockId].hasOwnProperty('component') ? steteBlocks[blockId].component : steteBlocks[blockId]} 
                  type={steteBlocks[blockId].hasOwnProperty('type') ? steteBlocks[blockId].type : null}
                  bundle={steteBlocks[blockId].hasOwnProperty('bundle') ? steteBlocks[blockId].bundle : null}
                   />}
              </div>);
            })}
          </div>
        )
      });
    }
    return (<Aux>{spinner}{blocks}</Aux>);
  }
}

const mapStateToProps = state => {
  return {
    page: state.page
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchPage: (pageId, fields) => dispatch(actions.getPage(pageId, fields))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Page);