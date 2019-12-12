import * as types from '../actions/types';

const initialState = {
  data: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAGE_SUCCESS: 
      const dataSuccess = state.data;
      const pageDataSuccess = dataSuccess.filter(e => e.key === action.key);

      if(pageDataSuccess.length == 0){
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
    case types.PAGE_FAIL:
      const dataFail = state.data;
      const pageDataFail = dataFail.filter(e => e.key === action.key);

      if(pageDataFail.length == 0){
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
    default: return state;
  }
};
export default Reducer;