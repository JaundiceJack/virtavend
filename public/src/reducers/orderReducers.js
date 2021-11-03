import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
ORDERS_LIST_REQUEST, ORDERS_LIST_SUCCESS, ORDERS_LIST_FAIL, ORDERS_LIST_RESET,
ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET
 } from '../actions/types.js';

const initialOrder = { loading: false, success: false, order: {}, error: null }
export const orderCreateReducer = (state = initialOrder, action) => {
  switch(action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true }
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, success:false, error: action.payload }
    default:
      return state
  }
}

const initialDetails = { loading: true, order: {}, error: null }
export const orderDetailsReducer = (state = initialDetails, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const initialOrders = { orders: [], loading: false, error: null }
export const ordersListReducer = (state = initialOrders, action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return { ...state, loading: true }
    case ORDERS_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload }
    case ORDERS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    case ORDERS_LIST_RESET:
      return { orders: [], loading: false, error: null }
    default:
      return state
  }
}

const initialPayment = { loading: false, success: false, error: null }
export const orderPayReducer = (state = initialPayment, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { ...state, loading: true }
    case ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { ...state, loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return { loading: false, success: false, error: null }
    default:
      return state
  }
}
