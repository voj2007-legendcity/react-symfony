import React from 'react';
// Components
import Page from '../../../core/Page';

const PageCourse = (props) =>  {
  return <Page {...props} alias="course" skipMeta={true} skipPagetitle={true} skipScroll={true} spinner={true} />;
};
export default PageCourse;