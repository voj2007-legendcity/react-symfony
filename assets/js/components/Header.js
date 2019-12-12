import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../../css/Header.css';

class Header extends Component {

  onChatHandler = () => {
    const els = document.querySelectorAll('.b24-widget-button-popup');
    (els.length > 0) ? els[0].click() : null;
  }

  render() {
    return (
      <div className={classes.Header}>
        <header>
          <div className={classes.TopHeaderArea}>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className={[classes.TopHeaderContent, 'd-flex', 'align-items-center'].join(' ')}>
                    {this.props.tel ? <a className="phone" href={"tel:" + this.props.tel.replace(/-/g, '')}><i className="fa fa-phone" aria-hidden="true"></i> <span className="d-none d-lg-inline">{this.props.tel}</span><small className="d-none d-lg-block">по России бесплатно</small></a> : ''}
                    {this.props.email ? <a href={"mailto:" + this.props.email}><i className="fa fa-envelope" aria-hidden="true"></i> <span className="d-none d-lg-inline">{this.props.email}</span></a> : ''}
                  </div>
                </div>
                <div className="col-6">
                  <div className={[classes.TopHeaderContent, classes.TopHeaderContentLast, 'd-flex', 'align-items-center', 'justify-content-end'].join(' ')}>
                  <NavLink to="/cart" className="p-0"><i className="fa fa-shopping-cart" aria-hidden="true"></i> <span>Корзина</span></NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-header-area">
            <div className={classes.ClassyNavContainer}>
              <div className="container">
                <nav className={[classes.ClassyNavbar, 'justify-content-between', 'd-flex', 'w-100', 'align-items-center'].join(' ')} id="hamiNav">
                  <NavLink to="/" className={[classes.NavBrand, 'text-white'].join(' ')}>{this.props.logo ? <img className="img-fluid" src={require("../../images/" + this.props.logo)} alt="Doing Well" /> : ''}</NavLink>
                  <div className={classes.ClassyNavbarToggler}>
                      <span className={classes.NavbarToggler}><span></span><span></span><span></span></span>
                  </div>
                  <div className="classy-menu">
                      <div className="classycloseIcon">
                          <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                      </div>
                      <div className={classes.Classynav}>
                        <ul>
                          <li><NavLink to="/courses">Курсы</NavLink></li>
                          <li><NavLink to="/about">О нас</NavLink></li>
                          <li><NavLink to="/contacts">Контакты</NavLink></li>
                        </ul>
                        <div className="live-chat-btn ml-5 mt-4 mt-lg-0 ml-md-4 d-none d-lg-block">
                          <button 
                            className={[classes.LiveChatBtn, classes.HamiBtn].join(' ')}
                            onClick={this.onChatHandler}><i className="fa fa-comments" aria-hidden="true"></i> Онлайн чат</button>
                        </div>
                      </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default Header;