// Import redux tools
import { combineReducers } from "redux";
// Import reducers
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userEditReducer,
  userTokenReducer,
} from "./userReducers";
import {
  productListReducer,
  productDetailsReducer,
  productEditReducer,
  productDeleteReducer,
  productAddReducer,
  productFeaturedReducer,
  productDealReducer,
  productReviewReducer,
} from "./productReducers";
import { cartReducer } from "./cartReducer";
import { articleDetailsReducer } from "./articleReducers.js";
import {
  orderCreateReducer,
  orderDetailsReducer,
  ordersListReducer,
  orderPayReducer,
  ordersManagementReducer,
} from "./orderReducers";

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productFeatured: productFeaturedReducer,
  productDeal: productDealReducer,
  productEdit: productEditReducer,
  productAdd: productAddReducer,
  productDelete: productDeleteReducer,
  productReview: productReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userEdit: userEditReducer,
  userToken: userTokenReducer,
  ordersList: ordersListReducer,
  ordersManagement: ordersManagementReducer,
  orderPay: orderPayReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  articleDetails: articleDetailsReducer,
});
