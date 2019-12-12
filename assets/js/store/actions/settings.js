import * as types from './types';
import Axios from '../../core/Axios';

export const settingsSuccess = (response) => {
  return {
    type: types.SETTINGS_SUCCESS,
    data: response
  };
};

export const settingsFail = (error) => {
  return {
    type: types.SETTINGS_FAIL,
    error: error
  };
};

export const getSettings = () => {
  return dispatch => {
    Axios.get('/api/settings')
      .then(response => {
        dispatch(settingsSuccess(response.data));
      })
      .catch(err => {
        dispatch(settingsFail(err));
      });
  };
};