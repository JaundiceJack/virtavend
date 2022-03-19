import axios from 'axios';
import { handleError } from './errorActions.js';
import {
  PRODUCT_FEATURED_REQUEST, PRODUCT_FEATURED_SUCCESS, PRODUCT_FEATURED_FAIL,
  PRODUCT_DEAL_REQUEST, PRODUCT_DEAL_SUCCESS, PRODUCT_DEAL_FAIL,
  ARTICLE_DETAILS_REQUEST, ARTICLE_DETAILS_SUCCESS, ARTICLE_DETAILS_FAIL,
} from './types.js';

export const getFeaturedProduct = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_FEATURED_REQUEST });
    const { data } = await axios.get(`/api/products/featured`);
    dispatch({ type: PRODUCT_FEATURED_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: PRODUCT_FEATURED_FAIL, payload: handleError(e) }) };
}

export const getDealProduct = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DEAL_REQUEST });
    const { data } = await axios.get(`/api/products/deal`);
    dispatch({ type: PRODUCT_DEAL_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: PRODUCT_DEAL_FAIL, payload: handleError(e) }) };
}


export const getLinks = () => async dispatch => {
  try {
    dispatch({ type: ARTICLE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/articles/`);
    dispatch({ type: ARTICLE_DETAILS_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: ARTICLE_DETAILS_FAIL, payload: handleError(e) }) };
}

export const getLinkDetails = async link => {
  const config = { headers: { 'Content-Type': 'application/json'} }
  try {
    const { data } = await axios.post(`/api/articles/`, { link }, config);
    return data;
  }
  catch (e) { console.log(e); }
}
