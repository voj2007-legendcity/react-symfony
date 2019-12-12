import * as types from '../actions/types';

const initialState = {
  data: [],
  error: false
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SETTINGS_SUCCESS: 
      return {
        ...state,
        data: action.data
      };
    case types.SETTINGS_FAIL: 
      return {
        ...state,
        error: action.error
      };
    default: return state;
  }
};
export default Reducer;