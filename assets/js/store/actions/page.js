import * as types from './types';
import Axios from '../../core/Axios';

export const pageSuccess = (alias, data) => {
  return {
    type: types.PAGE_SUCCESS,
    key: alias,
    state: data
  };
};

export const pageFail = (alias, error) => {
  return {
    type: types.PAGE_FAIL,
    key: alias,
    error: error
  };
};

export const getPage = (alias, data) => {
  let count = 0;
  let queryParams = '?';
  let fields = ''

  for (let entry of data) {
    fields += count === 0 ? 'fields[]=' + entry : '&fields[]=' + entry;
    count++;
  }
  queryParams += fields;

  return dispatch => {
    Axios.get('/api/page/' + alias + queryParams)
      .then(response => {
        dispatch(pageSuccess(alias, response.data));
      })
      .catch(err => {
        dispatch(pageFail(alias, err));
      });
  };
};