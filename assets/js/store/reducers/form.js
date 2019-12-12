import * as types from '../actions/types';

const initialState = {
  data: [],
  error: false,
  loading: false,
  success: false,
  message: ''
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_FORM: 
      return {
        ...state,
        loading: true
      };
    case types.RESET_FORM: 
      return {
        ...state,
        success: false,
        error: false
      };
    case types.FORM_SUCCESS: 
      return {
        ...state,
        message: action.message,
        loading: false,
        success: true,
        effect: true
      };
    case types.FORM_FAIL: 
      return {
        ...state,
        message: action.message,
        loading: false,
        error: true
      };
    default: return state;
  }
};
export default Reducer;