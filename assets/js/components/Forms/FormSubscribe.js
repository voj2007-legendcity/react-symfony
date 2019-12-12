import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
// Core
import FormBuilder from '../../core/Forms/FormBuilder';
// Styles
import classes from '../../../css/Forms/FormSubscribe.css';

class FormSubscribe extends FormBuilder {
  state = {
    form: {
      formControl: {
        subscribe: {
          type: 'text',
          value: '',
          placeholder: 'Эл. почта',
          autocomplete: 'off',
          valid: false,
          touched: false,
          classes: classes.Subscribe,
          validation: {
            require: true,
            minLength: 6,
            maxLength: 30,
            isEmail: true
          }
        },
        btn: {
          type: 'button',
          classBtn: classes.Button,
          classSkip: true,
          wrapper: false,
          text: (<i className="fa fa-paper-plane" aria-hidden="true"></i>)
        },
      },
      valid: false,
      classes: classes.SubscribeForm
    }
  }

  eventSubmit = (event) => {
    event.preventDefault();
    const data = {};

    for (let key in this.state.form.formControl) {
      if(this.state.form.formControl[key].type != 'button'){
        data[key] = this.state.form.formControl[key].value;
      }
    }
    this.props.onPostSubscribe(data);
  }

  render(){
    return(<div>{this.formGroup(this.state.form.formControl)}</div>);
  }
}

const mapStateToProps = state => {
  return {
    form: state.form.data,
    error: state.form.error,
    loading: state.form.loading,
    success: state.form.success,
    response: state.form.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onPostSubscribe: (data) => dispatch(actions.postSubscribe(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormSubscribe);