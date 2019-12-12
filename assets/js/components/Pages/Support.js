import React from 'react';
// Components
import Page from '../../core/Page';

const PageSupport = (props) =>  {
  return <Page {...props} alias="support" fields={['introtext']} skipMeta={true} skipScroll={true} spinner={true} />;
};
export default PageSupport;