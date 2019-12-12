import React from 'react';
// Components
import Page from '../../../core/Page';

const Courses = (props) =>  <Page {...props} alias="courses" fields={['title','introtext']} />;
export default Courses;