import React, { Component } from 'react';
// Components
import Modal from '../components/UI/Modal';
import Leftsidebar from '../components/UI/Leftsidebar';
// Core
import Aux from './Aux';

const WithErrorHandler = (WrappedComponent, Axios) => {
  return class extends Component {
    state = {
      type: false,
      modal: false,
      lefSidebarOpen: false,
      lefSidebarContent: null
    }

    intervalID = 0;

    componentDidMount () {
      clearInterval(this.intervalID);

      this.reqInterceptor = Axios.interceptors.request.use(req => {
        this.setState({modal: false});
        return req;
      } );
      this.resInterceptor = Axios.interceptors.response.use(res => {
        if(res.data.hasOwnProperty('modal')){
          this.setState({modal: res.data.modal, message: res.data.message, type: 'Success'});
          this.intervalID = setTimeout(() => {
            this.setState({modal: false, type: false});
          }, 5000);
        }
        return res;
      }, error => {
        this.setState({modal: true, message: error, type: 'Error'});
        this.intervalID = setTimeout(() => {
          this.setState({modal: false, type: false});
        }, 5000);
      });
    }

    componentWillUnmount () {
      Axios.interceptors.request.eject( this.reqInterceptor );
      Axios.interceptors.response.eject( this.resInterceptor );
      clearInterval(this.intervalID);
    }

    errorConfirmedHandler = () => {
      this.setState({modal: false});
    }

    openLefSidebarHandler = (SomeComponent, entityId) => {
      this.setState({
        lefSidebarOpen: true,
        lefSidebarContent: <SomeComponent entityId={entityId} close={this.closeLefSidebarHandler} />
      });
    }

    closeLefSidebarHandler = () => {
      this.setState({
        lefSidebarOpen: false,
        lefSidebarContent: null
      });
    }

    render () {
      return (
        <Aux>
          <Modal
            type={this.state.type}
            show={this.state.modal} >
            {this.state.modal ? this.state.message : null}
          </Modal>
          <Leftsidebar 
            open={this.state.lefSidebarOpen}
            content={this.state.lefSidebarContent}
            close={this.closeLefSidebarHandler} />
          <WrappedComponent 
            {...this.props}
            openLefSidebar={this.openLefSidebarHandler} />
        </Aux>
      );
    }
  }
}
export default WithErrorHandler;