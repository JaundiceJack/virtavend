import {
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_DETAILS_FAIL,
} from '../actions/types.js';


const initialArticles = {
  loading: false,
  error: null,
  articles: null
};
export const articleDetailsReducer = (state = initialArticles, action) => {
  switch(action.type) {
    case ARTICLE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ARTICLE_DETAILS_SUCCESS:
      return { ...state, loading: false, articles: action.payload }
    case ARTICLE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}
