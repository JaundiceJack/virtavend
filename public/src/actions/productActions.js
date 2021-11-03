import axios from 'axios';
import { handleError } from './errorActions.js';
import { PRODUCT_LIST_REQUEST,
         PRODUCT_LIST_SUCCESS,
         PRODUCT_LIST_FAIL,
         PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAIL, } from './types.js';

export const getProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products/');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: PRODUCT_LIST_FAIL, payload: handleError(e) }) };
};

export const getProduct = (id) => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: PRODUCT_DETAILS_FAIL, payload: handleError(e) }) };
};
