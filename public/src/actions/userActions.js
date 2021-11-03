import axios from 'axios';
import { handleError } from './errorActions.js';
import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT,
 USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS,
 USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
 USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
 ORDERS_LIST_RESET, USER_DETAILS_RESET
}
  from './types.js';

// Send the email & password to the server to try logging in
export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const headers = { 'Content-Type': 'application/json' };
    const { data } = await axios.post('/api/user/login', { email, password }, headers);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  catch (e) { dispatch({ type: USER_LOGIN_FAIL, payload: handleError(e) }) };
}

// Remove the user info from local storage to log out
export const logout = () => dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDERS_LIST_RESET });
}

// Send the name, email, & password to the server to make a new user
export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const headers = { 'Content-Type': 'application/json' };
    const { data } = await axios.post('/api/user/', { name, email, password }, headers);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  catch (e) {
    dispatch({ type: USER_REGISTER_FAIL, payload: handleError(e) });
    dispatch({ type: USER_LOGIN_FAIL, payload: handleError(e) });
 };
}

// Retrieve the current user's information
export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }};
    const { data } = await axios.get(`/api/user/${id}`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: USER_DETAILS_FAIL, payload: handleError(e) }) };
}

// Change the current user's information
export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }};
    const { data } = await axios.put('/api/user/profile', user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: handleError(e) }) };
}
