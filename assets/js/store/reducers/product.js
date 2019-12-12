import * as types from '../actions/types';

const initialState = {
  data: [],
  error: false
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_SUCCESS: 

      const dataSuccess = state.data;
      const blockDataSuccess = dataSuccess.filter(e => e.key === action.key);

      if(blockDataSuccess.length == 0){
        dataSuccess.push({
          key: action.key,
          state: action.state,
          error: false
        });
      }
      
      return {
        ...state,
        data: dataSuccess
      };
    case types.PRODUCT_FAIL: 
      const dataFail = state.data;
      const blockDataFail = dataFail.filter(e => e.key === action.key);

      if(blockDataFail.length == 0){
        dataFail.push({
          key: action.key,
          state: false,
          error: action.error
        });
      }
      return {
        ...state,
        data: dataFail
      };
      // return {
      //   ...state,
      //   data: null,
      //   error: action.error
      // };
    default: return state;
  }
};
export default Reducer;