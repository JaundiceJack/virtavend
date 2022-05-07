import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// Import reducers
import { userLoginReducer, userRegisterReducer,
  userDetailsReducer, userUpdateProfileReducer,
  userListReducer, userDeleteReducer,
  userEditReducer } from './reducers/userReducers';
import { productListReducer, productDetailsReducer,
  productEditReducer, productDeleteReducer, productAddReducer,
  productFeaturedReducer, productDealReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { articleDetailsReducer } from './reducers/articleReducers.js';
import { orderCreateReducer, orderDetailsReducer,
  ordersListReducer, orderPayReducer } from './reducers/orderReducers';

// Assign the state names to access reducer variables
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productFeatured: productFeaturedReducer,
  productDeal: productDealReducer,
  productEdit: productEditReducer,
  productAdd: productAddReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userEdit: userEditReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  ordersList: ordersListReducer,
  orderPay: orderPayReducer,
  articleDetails: articleDetailsReducer,
});

// Get stuff from local storage if returning user
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
  JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
  JSON.parse(localStorage.getItem('paymentMethod')) : '';

// Load stuff from the storage into the initial states
const initialState = {
  cart: {
    items: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    savedPaymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
