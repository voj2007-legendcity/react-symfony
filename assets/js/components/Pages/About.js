import React from 'react';
// Components
import Page from '../../core/Page';

const About = (props) =>  <Page {...props} alias="about" fields={['title','introtext']} />;
export default About;