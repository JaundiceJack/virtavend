import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  PRODUCT_FEATURED_REQUEST, PRODUCT_FEATURED_SUCCESS, PRODUCT_FEATURED_FAIL,
  PRODUCT_DEAL_REQUEST, PRODUCT_DEAL_SUCCESS, PRODUCT_DEAL_FAIL
} from '../actions/types.js';

const initialList = { products: [], loading: false, error: null };
export const productListReducer = (state = initialList, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  };
};

const initialDetails = { product: { reviews: [] }, loading: false, error: null };
export const productDetailsReducer = (state = initialDetails, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  };
};

const initialFeatured = { product: {}, loading: false, error: null };
export const productFeaturedReducer = (state = initialFeatured, action) => {
  switch (action.type) {
    case PRODUCT_FEATURED_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_FEATURED_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case PRODUCT_FEATURED_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  };
};

const initialDeal = { product: {}, loading: false, error: null };
export const productDealReducer = (state = initialDeal, action) => {
  switch (action.type) {
    case PRODUCT_DEAL_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DEAL_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case PRODUCT_DEAL_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
