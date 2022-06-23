import axios from "axios";
import { handleError } from "./errorActions.js";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_CREATE_ERROR_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDERS_MANAGEMENT_REQUEST,
  ORDERS_MANAGEMENT_SUCCESS,
  ORDERS_MANAGEMENT_FAIL,
  ORDERS_MANAGEMENT_RESET,
} from "./types.js";

// Create a configuration with the user's token
const tokenConfig = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  return config;
};

// Make a new order
export const createOrder = (order) => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    dispatch({ type: ORDER_CREATE_REQUEST });
    try {
      const { data } = await axios.post(
        `/api/orders`,
        order,
        tokenConfig(getState)
      );
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      resolve(data._id);
    } catch (e) {
      dispatch({ type: ORDER_CREATE_FAIL, payload: handleError(e) });
      reject(e);
    }
  });
};

// Get the order with the given id and put it in the redux store
export const getOrderDetails = (id) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `/api/orders/${id}`,
      tokenConfig(getState)
    );
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: handleError(e) });
  }
};

// Get all orders for the user with the supplied token
export const getOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDERS_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/orders", tokenConfig(getState));
    dispatch({ type: ORDERS_LIST_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: ORDERS_LIST_FAIL, payload: handleError(e) });
  }
};

// Update the order with the given id to paid
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST });
    try {
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        tokenConfig(getState)
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: ORDER_PAY_FAIL, payload: handleError(e) });
    }
  };

// Clear out the order status in the redux store
export const resetOrderCreate = () => (dispatch) => {
  dispatch({ type: ORDER_CREATE_RESET });
};
// Clear out any order errors in the redux store
export const resetOrderError = () => (dispatch) => {
  dispatch({ type: ORDER_CREATE_ERROR_RESET });
};

// Admin function: retrieve all users' orders
export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDERS_MANAGEMENT_REQUEST });
  try {
    const { data } = await axios.get(
      "/api/admin/orders",
      tokenConfig(getState)
    );
    dispatch({ type: ORDERS_MANAGEMENT_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: ORDERS_MANAGEMENT_FAIL, payload: handleError(e) });
  }
};
