import * as types from './types';
import Axios from '../../core/Axios';

export const cartSuccess = (data) => {
  return {
    type: types.CART_SUCCESS,
    state: data
  };
};

export const cartFail = (error) => {
  return {
    type: types.CART_FAIL,
    error: error
  };
};

export const getCart = (token) => {
  return dispatch => {
    Axios.get('/api/cart/' + token)
      .then(response => {
        dispatch(cartSuccess(response.data));
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const addToCart = (data) => {
  return dispatch => {
    Axios.post('/api/cart/product/add', data)
      .then(response => {
        if(response.data.success){
          let productsInCart = [];

          if(!localStorage.getItem('cartToken')){
            localStorage.setItem('cartToken', response.data.token);
          }

          if(localStorage.getItem('productsInCart')){
            productsInCart = localStorage.getItem('productsInCart').split(',');
          }
      
          if(!productsInCart.includes(data.get('id'))){
            productsInCart.push(data.get('id'));
          }
          localStorage.setItem('productsInCart', productsInCart);
          dispatch(cartSuccess(response.data));
        }
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const deletePromocode = (token) => {
  return dispatch => {
    Axios.delete('/api/cart/promocode/delete/' + token)
      .then(response => {
        if(response.data.success){
          dispatch(cartSuccess(response.data));
        }
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const deleteProduct = (token, id) => {
  return dispatch => {
    Axios.delete('/api/cart/product/delete/' + token + '/' + id)
      .then(response => {
        if(response.data.success){
          dispatch(cartSuccess(response.data));
          let productsInCart = [];
          
          if(response.data.removeToken) {
            localStorage.removeItem('cartToken');
          }
          
          if(localStorage.getItem('productsInCart')){
            productsInCart = localStorage.getItem('productsInCart').split(',');
            const index = productsInCart.indexOf(id.toString());
            productsInCart.splice(index, 1);
          }
          localStorage.setItem('productsInCart', productsInCart);
        }
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const addPromocode = (token, data) => {
  return dispatch => {
    Axios.post('/api/cart/promocode/add/' + token, data)
      .then(response => {
        if(response.data.success){
          dispatch(cartSuccess(response.data));
        }
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const addOrder = (token, data) => {
  return dispatch => {
    Axios.post('/api/order/add/' + token, data)
      .then(response => {
        if(response.data.success){
          localStorage.removeItem('cartToken');
          localStorage.removeItem('productsInCart');
          dispatch(cartSuccess(response.data));

        }
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};