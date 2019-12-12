import * as types from './types';
import Axios from '../../core/Axios';

export const blockSuccess = (blockId, data) => {
  return {
    type: types.BLOCK_SUCCESS,
    key: blockId,
    state: data
  };
};

export const blockFail = (blockId, error) => {
  return {
    type: types.BLOCK_FAIL,
    key: blockId,
    error: error
  };
};

export const getBlockEntityCollection = (blockId, data) => {
  return dispatch => {
    let queryParams = '?entity=' + data.entity;
    let fields = '';

    for (let entry of data.fields) {
      fields += '&fields[]=' + entry;
    }
    queryParams += fields;

    Axios.get('/api/block/' + blockId + '/entity/collection' + queryParams)
      .then(response => {
        dispatch(blockSuccess(blockId, response.data));
      })
      .catch(err => {
        dispatch(blockFail(blockId, err));
      });
  };
};

export const getBlock = (blockId) => {
  return dispatch => {
    Axios.get('/api/block/' + blockId)
      .then(response => {
        dispatch(blockSuccess(blockId, response.data));
      })
      .catch(err => {
        dispatch(blockFail(blockId, err));
      });
  };
};