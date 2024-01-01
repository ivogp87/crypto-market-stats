import {
  TRENDING_SEARCHES_REQUEST,
  TRENDING_SEARCHES_SUCCESS,
  TRENDING_SEARCHES_ERROR,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  coins: [],
  lastUpdated: null,
};

const trendingSearchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRENDING_SEARCHES_REQUEST:
      return { ...state, status: 'loading', error: null };
    case TRENDING_SEARCHES_SUCCESS:
      return { ...state, ...action.payload, status: 'idle' };
    case TRENDING_SEARCHES_ERROR:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export default trendingSearchesReducer;
