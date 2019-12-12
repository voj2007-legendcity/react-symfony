import * as types from '../actions/types';

const initialState = {
  data: null,
  error: false
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CART_SUCCESS: 
      return {
        ...state,
        data: action.state
      };
    case types.CART_FAIL:
      return {
        ...state,
        error: action.error
      };
    default: return state;
  }
};
export default Reducer;