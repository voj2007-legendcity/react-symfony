import React from 'react';
// Core
import FormBuilder from '../../core/Forms/FormBuilder';
// Styles
import classes from '../../../css/Forms/FormCheckout.css';

class FormCheckout extends FormBuilder {
  state = {
    form: {
      formControl: {
        name: {
          type: 'text',
          value: '',
          placeholder: 'Имя',
          autocomplete: 'off',
          valid: false,
          touched: false,
          validation: {
            require: true,
            minLength: 2
          }
        },
        email: {
          type: 'text',
          value: '',
          placeholder: 'Эл. почта',
          autocomplete: 'off',
          valid: false,
          touched: false,
          validation: {
            require: true,
            minLength: 6,
            maxLength: 30,
            isEmail: true
          }
        },
        phone: {
          type: 'text',
          value: '',
          placeholder: 'Телефон',
          autocomplete: 'off',
          valid: false,
          touched: false,
          validation: {
            require: true,
            minLength: 10,
            maxLength: 15,
          }
        },
        message: {
          type: 'textarea',
          value: '',
          placeholder: 'Комментарий к заказу',
          autocomplete: 'off',
          valid: false,
          touched: false,
          validation: {}
        },
        payment: {
          type: 'select',
          placeholder: null,
          valid: false,
          touched: false,
          label: 'Способы оплаты',
          options: [
            {value: 'visa', displayValue: 'Банковские карты VISA, MasterCard, Maestro'},
            {value: 'alfabank', displayValue: 'Альфаклик'},
            {value: 'promsvyzbank', displayValue: 'Промсвязьбанк'},
            {value: 'yandex', displayValue: 'Яндекс.Деньги'},
            {value: 'qiwi', displayValue: 'QIWI Wallet'},
            {value: 'webmonay', displayValue: 'WebMoney'}
          ],
          value: 'visa',
          validation: {}
        },
        btn: {
          type: 'button',
          typeBtn: 'Danger',
          text: 'Перейти к оплате'
        },
      },
      valid: false,
      classes: classes.СheckoutForm
    }
  }

  eventSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    
    for (let key in this.state.form.formControl) {
      if(this.state.form.formControl[key].type != 'button'){
        if(this.state.form.formControl[key].type === 'file'){
          data.append(key, this.state.form.formControl[key].data);
        }else{
          data.append(key, this.state.form.formControl[key].value);
        }
      }
    }
    this.props.addOrder(data);
  }

  render(){
    return(<div>{this.formGroup(this.state.form.formControl)}</div>);
  }
}
export default FormCheckout;