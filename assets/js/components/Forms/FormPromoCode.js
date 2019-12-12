import React from 'react';
// Core
import FormBuilder from '../../core/Forms/FormBuilder';
// Styles
import classes from '../../../css/Forms/FormSubscribe.css';
import classesFormPromoCode from '../../../css/Forms/FormPromoCode.css';

class FormPromoCode extends FormBuilder {
  state = {
    form: {
      formControl: {
        promocode: {
          type: 'text',
          value: '',
          placeholder: 'Промокод',
          autocomplete: 'off',
          disabled: false,
          valid: false,
          touched: false,
          classes: [classes.Subscribe, classesFormPromoCode.Input].join(' '),
          validation: {
            require: true,
            minLength: 20,
            maxLength: 30
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
      classes: [classes.SubscribeForm, classesFormPromoCode.Form].join(' ')
    }
  }

  componentDidMount(){
    if(this.props.promoCode){
      const form = {
        ...this.state.form
      };
      const promoCode = { 
        ...form.formControl.promocode
      };
      promoCode.value = this.props.promoCode;
      promoCode.valid = true;
      promoCode.touched = true;
      promoCode.disabled = true;
      form.formControl.promocode = promoCode;
      form.valid = false;

      this.setState({
        form: form
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.promoCode != this.props.promoCode && this.props.promoCode === null){
      const form = {
        ...this.state.form
      };
      const promoCode = { 
        ...form.formControl.promocode
      };
      promoCode.value = '';
      promoCode.valid = false;
      promoCode.touched = false;
      promoCode.disabled = false;
      form.formControl.promocode = promoCode;
      form.valid = false;
      this.setState({
        form: form
      })
    }
    if(prevProps.promoCode != this.props.promoCode && this.props.promoCode !== null){
      const form = {
        ...this.state.form
      };
      const promoCode = { 
        ...form.formControl.promocode
      };
      promoCode.value = this.props.promoCode;
      promoCode.valid = false;
      promoCode.touched = false;
      promoCode.disabled = true;
      form.formControl.promocode = promoCode;
      form.valid = false;
      this.setState({
        form: form
      })
    }
  }

  eventSubmit = (event) => {
    event.preventDefault();
    this.props.addPromoCode(this.state.form.formControl.promocode.value);
  }

  render(){
    return(<div>{this.formGroup(this.state.form.formControl)}</div>);
  }
}
export default FormPromoCode;