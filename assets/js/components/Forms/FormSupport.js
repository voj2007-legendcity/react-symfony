import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
// Core
import FormBuilder from '../../core/Forms/FormBuilder';
// Styles
import classes from '../../../css/Forms/FormSupport.css';

class FormSupport extends FormBuilder {
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
        message: {
          type: 'textarea',
          value: '',
          placeholder: 'Опишите проблему, как можно подробнее',
          autocomplete: 'off',
          valid: false,
          touched: false,
          validation: {
            require: true,
            minLength: 10,
            maxLength: 200,
          }
        },
        filename: {
          type: 'file',
          value: '',
          data: null,
          label: 'Выберите файл',
          placeholder: 'Опишите проблему, как можно подробнее',
          autocomplete: 'off',
          valid: false,
          touched: false,
          wrapperClass: 'FileGroup',
          helperText: 'Вы можете прикрепить файлы с расширением .jpg, .pdf, .doc, .txt или .png',
          validation: {
            fileExtension: {
              allowed: ['jpg','png','pdf','doc','txt']
            }
          }
        },
        btn: {
          type: 'button',
          classBtn: classes.Button,
          typeBtn: 'Danger',
          text: 'Отправить'
        },
      },
      valid: false,
      classes: classes.FormSupport
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
    this.props.onPostSupport(data);
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
    onPostSupport: (data) => dispatch(actions.postSupport(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormSupport);