import axios from 'axios';
import { handleError } from './errorActions.js';
import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
  PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_FAIL,
  PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
} from './types.js';

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

// Create a configuration with the user's token
const tokenConfig = (getState) => {
  const { userLogin: { userInfo } } = getState();
  const config = { headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`
  }};
  return config;
}

// Remove the selected product
export const deleteProduct = productId => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const { data } = await axios.delete(`/api/admin/products/${productId}`, tokenConfig(getState));
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
      dispatch(getProducts());
      resolve(true);
    } catch (e) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: handleError(e) });
      resolve(false);
     }
  })
}

// Edit the selected product
export const editProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    const { data } = await axios.put(`/api/admin/products/${product._id}`, product, tokenConfig(getState));
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    dispatch(getProducts());
  } catch (e) { dispatch({ type: PRODUCT_EDIT_FAIL, payload: handleError(e) }) }
}

// Create a new product
export const addProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { data } = await axios.post(`/api/admin/products/`, product, tokenConfig(getState));
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    dispatch(getProducts());
  } catch (e) { dispatch({ type: PRODUCT_CREATE_FAIL, payload: handleError(e) }) }
}
