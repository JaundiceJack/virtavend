import {
  USER_LOGIN_REQUEST,    USER_LOGIN_SUCCESS,    USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGIN_ERROR_RESET,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET,
  USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
  USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL,
  TOKEN_VALIDATE_REQUEST, TOKEN_VALIDATE_SUCCESS, TOKEN_VALIDATE_FAIL
} from '../actions/types.js';

// User Login Reducer
const initialUser = { userInfo: null, loading: false, error: null }
export const userLoginReducer = (state = initialUser, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload }
    case USER_LOGIN_ERROR_RESET:
      return { ...state, error: null }
    case USER_LOGOUT:
      return initialUser
    default:
      return state
  };
};

// User Registration Reducer
const initialRegister = { loading: false, error: null, userInfo: {} }
export const userRegisterReducer = (state = initialRegister, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  };
};

// User Profile Details Reducer
const initialDetails = { loading: false, error: null, user: {} }
export const userDetailsReducer = (state = initialDetails, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { loading: false, error: null, user: {} }
    default:
      return state
  };
};

// User Profile Update Reducer
const initialUpdate = { loading: false, success: false, error: null, userInfo: {} }
export const userUpdateProfileReducer = (state = initialUpdate, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  };
};

// Admin User List Reducer
const initialUsers = { loading: false, success: false, error: null, users: [] }
export const userListReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { loading: false, error: null, users: [] }
    default:
      return state
  };
};

// Admin User Deletion Reducer
const initialDelete = { loading: false, message: false, error: null }
export const userDeleteReducer = (state = initialDelete, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, message: action.payload }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  };
};

// Admin User Edit Reducer
const initialEdit = { loading: false, user: {}, error: null }
export const userEditReducer = (state = initialEdit, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { ...state, loading: true }
    case USER_EDIT_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  };
};

// Token Validation Reducer
const initialValidate = { validating: false, error: null };
export const userTokenReducer = (state = initialValidate, action) => {
  switch (action.type) {
    case TOKEN_VALIDATE_REQUEST:
      return { validating: true }
    case TOKEN_VALIDATE_SUCCESS:
      return { validating: false }
    case TOKEN_VALIDATE_FAIL:
      return { validating: false, error: action.payload }
    default:
      return state
  }
}
