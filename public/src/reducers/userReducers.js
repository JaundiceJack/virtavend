import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,
USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL
} from '../actions/types.js';

const initialUser = { userInfo: {}, loading: false, error: null }
export const userLoginReducer = (state = initialUser, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  };
};

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