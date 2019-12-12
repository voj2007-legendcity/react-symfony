import * as types from './types';
import Axios from '../../core/Axios';

export const productSuccess = (alias, data) => {
  return {
    type: types.PRODUCT_SUCCESS,
    key: alias,
    state: data
  };
};

export const productFail = (alias, error) => {
  return {
    type: types.PRODUCT_FAIL,
    key: alias,
    error: error
  };
};

export const getProduct = (alias, data) => {
  return dispatch => {
    let count = 0;
    let queryParams = '?';
    let fields = ''

    for (let entry of data) {
      fields += count === 0 ? 'fields[]=' + entry : '&fields[]=' + entry;
      count++;
    }
    queryParams += fields;

    Axios.get('/api/product/' + alias + queryParams)
      .then(response => {
        dispatch(productSuccess(alias, response.data));
      })
      .catch(err => {
        dispatch(productFail(alias, err));
      });
  };
};