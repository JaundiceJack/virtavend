import axios from 'axios';
import { handleError } from './errorActions.js';
import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGIN_ERROR_RESET,
 USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS,
 USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
 USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
 ORDERS_LIST_RESET, USER_DETAILS_RESET,
 USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET,
 USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
 USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL,
 TOKEN_VALIDATE_REQUEST, TOKEN_VALIDATE_SUCCESS, TOKEN_VALIDATE_FAIL
} from './types.js';

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
  dispatch({ type: USER_LIST_RESET });
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

// Create a configuration with the user's token
const tokenConfig = (getState) => {
  const { userLogin: { userInfo } } = getState();
  const config = { headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`
  }};

  return config;
}

// Retrieve the current user's information
export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/user/${id}`, tokenConfig(getState));
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: USER_DETAILS_FAIL, payload: handleError(e) }) };
}

// Change the current user's information
export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put('/api/user/profile', user, tokenConfig(getState));
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: handleError(e) }) };
}

// Retrieve a list of all users
export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get(`/api/user/`, tokenConfig(getState));
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: USER_LIST_FAIL, payload: handleError(e) }) };
}

// Remove the selected user
export const deleteUser = userId => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST });
      const { data } = await axios.delete(`/api/user/${userId}`, tokenConfig(getState));
      dispatch({ type: USER_DELETE_SUCCESS, payload: data });
      dispatch(getUsers());
      resolve(true);
    } catch (e) {
      dispatch({ type: USER_DELETE_FAIL, payload: handleError(e) });
      resolve(false);
    }
  })

}

// Edit the selected user
export const editUser = user => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDIT_REQUEST });
    const { data } = await axios.put(`/api/user/${user._id}`, user, tokenConfig(getState));
    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
    dispatch(getUsers());
  } catch (e) { dispatch({ type: USER_EDIT_FAIL, payload: handleError(e) }) }
}

// Clear the login error
export const resetLoginError = () => dispatch => {
  dispatch({ type: USER_LOGIN_ERROR_RESET });
}

// Check that a given token is still valid
export const validateToken = token => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: TOKEN_VALIDATE_REQUEST });
      const { data } = await axios.post('/api/user/validate', { token }, tokenConfig(getState));
      dispatch({ type: TOKEN_VALIDATE_SUCCESS });
      if (data && data.exp && data.exp < Date.now()) resolve(true)
      else resolve(false)
    }
    catch (e) {
      dispatch({ type: TOKEN_VALIDATE_FAIL, payload: handleError(e) });
      dispatch(logout());
      resolve(false);
    };
  })
}
