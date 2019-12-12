import React from 'react';
// Components
import Page from '../../core/Page';

const Contacts = (props) =>  <Page {...props} alias="contacts" fields={['title','introtext']} />;
export default Contacts;