import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_FEATURED_REQUEST,
  PRODUCT_FEATURED_SUCCESS,
  PRODUCT_FEATURED_FAIL,
  PRODUCT_DEAL_REQUEST,
  PRODUCT_DEAL_SUCCESS,
  PRODUCT_DEAL_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
} from "../actions/types.js";

const initialList = { products: [], loading: false, error: null };
export const productListReducer = (state = initialList, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        numPages: action.payload.numPages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialDetails = {
  product: { reviews: [] },
  loading: false,
  error: null,
};
export const productDetailsReducer = (state = initialDetails, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialDelete = { message: null, loading: false, error: null };
export const productDeleteReducer = (state = initialDelete, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialEdit = { product: { reviews: [] }, loading: false, error: null };
export const productEditReducer = (state = initialEdit, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_EDIT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_EDIT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialAdd = { product: { reviews: [] }, loading: false, error: null };
export const productAddReducer = (state = initialAdd, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return initialAdd;
    default:
      return state;
  }
};

const initialFeatured = { product: {}, loading: false, error: null };
export const productFeaturedReducer = (state = initialFeatured, action) => {
  switch (action.type) {
    case PRODUCT_FEATURED_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_FEATURED_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_FEATURED_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialDeal = { product: {}, loading: false, error: null };
export const productDealReducer = (state = initialDeal, action) => {
  switch (action.type) {
    case PRODUCT_DEAL_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DEAL_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DEAL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialReview = { loading: false, error: null, success: false };
export const productReviewReducer = (state = initialReview, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { ...state, loading: true };
    case REVIEW_CREATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case REVIEW_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case REVIEW_CREATE_RESET:
      return initialReview;
    default:
      return state;
  }
};
