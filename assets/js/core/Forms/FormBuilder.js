/*
  Тут обычное построение формы. В одном месте собрано и проверка и реализация инпутов или селектов и тд.. а на странице 
  вызове просто обращаемся к этой функции передаем в нее JSON условиями а этот компонент стоит нам всю форму и про 
  событиях в зависимости от условий проеряет форму на ошибки и тд..
*/

import React, {Component} from 'react';
// Styles
import classes from '../../../css/Forms/Form.css';
// UI
import Button from '../../components/UI/Button';

class FormBuilder extends Component {
  intervalID = 0;

  componentWillUnmount () {
    clearInterval(this.intervalID);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.success){
      const form = {
        ...this.state.form
      };
      const elements = { 
        ...form.formControl
      };
      Object.keys(elements).map(key => {
        if(elements[key].type != 'button'){
          elements[key].value = '';
        }
      });
      form.formControl = elements;
      
      if(this.props.hasOwnProperty('close')){
        this.intervalID = setTimeout(() => {
          this.props.close();
        }, 1000);
      }
      
      this.setState({
        form: form
      });
    }
  }

  formGroup = (controls) => {
    const form = Object.keys(controls).map(key => {
      return this.formControl(key);
    });

    return (
      <div className={classes.FormContainer}>
        <form className={[classes.Form, this.state.form.classes].join(' ')} onSubmit={this.eventSubmit}>{form}</form>
      </div>
    )
  }

  formControl = (key) => {
    let element = null;
    let helperText = null;
    const disabled = this.state.form.formControl[key].hasOwnProperty('disabled') ? this.state.form.formControl[key].disabled : false;
    const elementClasses = [classes.Default];

    if(typeof this.state.form.formControl[key].classes != 'undefined'){
      elementClasses.push(this.state.form.formControl[key].classes);
    }

    if (!this.state.form.formControl[key].valid && this.state.form.formControl[key].touched 
      && this.state.form.formControl[key].value.length > 0 && Object.entries(this.state.form.formControl[key].validation).length !== 0) {
      elementClasses.push(classes.Invalid);
    }

    switch(this.state.form.formControl[key].type){
      case 'button':
        element = <Button 
                    key={key}
                    classSkip={this.state.form.formControl[key].classSkip}
                    typeBtn={this.state.form.formControl[key].typeBtn}
                    uniqueKey={this.state.form.formControl[key].uniqueKey ? this.state.form.formControl[key].uniqueKey : key} 
                    disabledState={!this.state.form.valid || this.props.loading}
                    classBtn={this.state.form.formControl[key].classBtn}
                    clicked={this.click}>{this.state.form.formControl[key].text}</Button>
        break;
      case 'select':
        element = (
          <select
            className={elementClasses.join(' ')}
            key={key}
            disabled={disabled}
            value={this.state.form.formControl[key].value}
            onChange={(event) => this.change(event, key)} 
            onFocus={() => this.focus(key)} 
            >
            {this.state.form.formControl[key].options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.displayValue}
                </option>
            ))}
          </select>
        );
        break;
      case 'textarea':
        element = <textarea
          className={elementClasses.join(' ')}
          key={key}
          disabled={disabled}
          value={this.state.form.formControl[key].value}
          placeholder={this.state.form.formControl[key].placeholder}
          autoComplete={this.state.form.formControl[key].autocomplete}
          onChange={(event) => this.change(event, key)} 
          onFocus={() => this.focus(key)} 
        />;
        break;
      case 'file':
        element = <input
          type={this.state.form.formControl[key].type}
          className={elementClasses.join(' ')}
          key={key}
          disabled={disabled}
          id={'form-element-' + key}
          value={this.state.form.formControl[key].value}
          placeholder={this.state.form.formControl[key].placeholder}
          autoComplete={this.state.form.formControl[key].autocomplete}
          onChange={(event) => this.change(event, key, 'file')} 
          onFocus={() => this.focus(key)} 
        />;
        break;
      default:
        element = <input
          type={this.state.form.formControl[key].type}
          className={elementClasses.join(' ')}
          key={key}
          disabled={disabled}
          value={this.state.form.formControl[key].value}
          placeholder={this.state.form.formControl[key].placeholder}
          autoComplete={this.state.form.formControl[key].autocomplete}
          onChange={(event) => this.change(event, key)} 
          onFocus={() => this.focus(key)} 
          />;
        break;
    }

    if(this.state.form.formControl[key].hasOwnProperty('helperText')){
      helperText = (<div className={classes.HelperText}>{this.state.form.formControl[key].helperText}</div>);
    }

    return element = this.state.form.formControl[key].label != null ? 
              this.label(key, element, helperText) : 
              this.state.form.formControl[key].hasOwnProperty('wrapper') && !this.state.form.formControl[key].wrapper ? element :
              (<div key={key + '_wrapper'} className={classes.FormGroup}>{element}{helperText}</div>);
  }

  label = (key, element, helperText) => {
    const classesFormGroup = [classes.FormGroup];
    const labelClasses = [];

    if (!this.state.form.formControl[key].valid && this.state.form.formControl[key].touched 
      && this.state.form.formControl[key].value.length > 0 && Object.entries(this.state.form.formControl[key].validation).length !== 0) {
      labelClasses.push(classes.Invalid);
    }

    if(this.state.form.formControl[key].type === 'file'){
      classesFormGroup.push(classes.FileGroup);
    }

    return (
      <div key={key + '_wrapper'} className={classesFormGroup.join(' ')}>
        <label key={key + '_label'} htmlFor={'form-element-' + key} className={labelClasses.join(' ')}>{this.state.form.formControl[key].label}</label>
        {element}{helperText}
      </div>
    );
  }

  change = (event, key, type = null) => {
    const form = {
        ...this.state.form
    };
    const element = { 
      ...form.formControl[key]
    };
    element.value = event.target.value;
    element.touched = true;
    element.valid = this.validation(element.value, element.validation);

    if(type === 'file'){
      if(element.value.length > 0){
        const fileName = element.value.split("\\").pop();
        element.data = event.target.files[0];
        element.label = fileName;
      }else{
        element.label = 'Выберите файл';
      }
    }

    form.formControl[key] = element;
    
    let valid = true;
    for (let k in form.formControl) {
      if(form.formControl[k].type != 'button' && form.formControl[k].hasOwnProperty('valid') && Object.keys(form.formControl[k].validation).length != 0){
        valid = form.formControl[k].valid && valid;
      }
    }

    form.valid = valid;

    this.setState({
      form: form
    });
  }

  focus = (key) => {
    const form = {
        ...this.state.form
    };
    const element = { 
      ...form.formControl[key]
    };
    element.touched = true;
    form.formControl[key] = element;
    this.setState({
      form: form
    });
  }

  validation(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }
    if (rules.fileExtension) {
      const extension = value.slice((value.lastIndexOf(".") - 1 >>> 0) + 2);
      isValid = rules.fileExtension.allowed.includes(extension) && isValid
    }
    return isValid;
  }
}
export default FormBuilder;