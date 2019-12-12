import * as types from './types';
import Axios from '../../core/Axios';

export const formLoading = () => {
  return {
    type: types.LOADING_FORM
  };
};

export const formReset = () => {
  return {
    type: types.RESET_FORM
  };
};

export const formSuccess = (success) => {
  return {
    type: types.FORM_SUCCESS,
    message: success
  };
};

export const formFail = (error) => {
  return {
    type: types.FORM_FAIL,
    message: error
  };
};

export const postSubscribe = (data) => {
  return dispatch => {
    dispatch(formLoading());
    Axios.post('/api/form/subscribe', data)
      .then(response => {
        dispatch(formSuccess(response.data));
        dispatch(formReset());
      })
      .catch(err => {
        dispatch(formFail(err));
      });
  };
};

export const postSupport = (data) => {
  return dispatch => {
    dispatch(formLoading());
    Axios.post('/api/form/support', data)
      .then(response => {
        dispatch(formSuccess(response.data));
        dispatch(formReset());
      })
      .catch(err => {
        dispatch(formFail(err));
      });
  };
};

export const postDiscount = (data) => {
  return dispatch => {
    dispatch(formLoading());
    Axios.post('/api/form/discount', data)
      .then(response => {
        dispatch(formSuccess(response.data));
        dispatch(formReset());
      })
      .catch(err => {
        dispatch(formFail(err));
      });
  };
};
