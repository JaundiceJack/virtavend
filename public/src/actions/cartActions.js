import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from './types.js';

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({ type: CART_ADD_ITEM, payload: {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty
  }});
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
}

export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
}

export const saveShipping = (address, city, zip, country, state="") => dispatch => {
  const shipping = { address, city, zip, country, state };
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: shipping });
  localStorage.setItem('shippingAddress', JSON.stringify(shipping));
}

export const savePaymentMethod = (paymentMethod) => dispatch => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod });
  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
}
