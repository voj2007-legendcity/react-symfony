import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// Styles
import classes from '../../css/Footer.css';
// Forms
import FormSubscribe from './Forms/FormSubscribe';

class Footer extends Component {
  render() {
    return (
      <div className={classes.Footer}>
        <footer>
          <div className={classes.BlTop}>
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-md-6 col-lg-8">
                  <ul className="list-inline">
                    <li><NavLink to="/courses">Наши курсы</NavLink></li>
                    <li><NavLink to="/about">О нас</NavLink></li>
                    <li><NavLink to="/contacts">Контакты</NavLink></li>
                    <li><NavLink to="/policy">Политика конфиденциальности</NavLink></li>
                    <li><NavLink to="/payment-and-returns">Оплата и возврат</NavLink></li>
                  </ul>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className={classes.Helper}>Подпишитесь на нашу электронную рассылку для полезных советов и ценных ресурсов.</div>
                  <FormSubscribe />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.BlBottom}>
            <div className="container">
              <div className="row align-items-center mb-0">
                <div className="col-12 col-md-6">
                  <div className={classes.Copyright}>Copyright &copy; {(new Date().getFullYear())}  | Разработка сайта <i className="fa fa-heart-o" aria-hidden="true"></i> <a href="https://depthinteractive.ru/" target="_blank"><b>Depth Interactive</b></a></div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center justify-content-lg-end">
                    <span>Мы принимаем к оплате</span>
                    <i className="fa fa-cc-visa" aria-hidden="true"></i>
                    <i className="fa fa-cc-mastercard" aria-hidden="true"></i>
                    <i className="fa fa-cc-discover" aria-hidden="true"></i>
                    <i className="fa fa-cc-amex" aria-hidden="true"></i>
                    <i className="fa fa-cc-paypal" aria-hidden="true"></i>
                    <i className="fa fa-cc-stripe" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;