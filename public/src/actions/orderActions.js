import axios from 'axios';
import { handleError } from './errorActions.js';
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET, ORDER_CREATE_ERROR_RESET,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
  ORDERS_LIST_REQUEST, ORDERS_LIST_SUCCESS, ORDERS_LIST_FAIL,
  ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL
} from './types.js';

export const createOrder = order => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const { userLogin: { userInfo } } = getState();
    const config = { headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }};
    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: ORDER_CREATE_FAIL, payload: handleError(e) }) };
}

export const getOrderDetails = id => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  try {
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: ORDER_DETAILS_FAIL, payload: handleError(e) }) };
}

export const getOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDERS_LIST_REQUEST });
  try {
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
    const { data } = await axios.get('/api/orders', config);
    dispatch({ type: ORDERS_LIST_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: ORDERS_LIST_FAIL, payload: handleError(e) }) };
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST });
  try {
    const { userLogin: { userInfo } } = getState();
    const config = { headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }};
    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: ORDER_PAY_FAIL, payload: handleError(e) }) };
}

export const resetOrderCreate = () => dispatch => {
  dispatch({ type: ORDER_CREATE_RESET });
}

export const resetOrderError = () => dispatch => {
  dispatch({ type: ORDER_CREATE_ERROR_RESET });
}
