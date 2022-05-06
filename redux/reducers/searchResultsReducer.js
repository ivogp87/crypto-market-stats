import {
  SET_SEARCH_QUERY,
  SEARCH_RESULTS_REQUEST,
  SEARCH_RESULTS_SUCCESS,
  SEARCH_RESULTS_ERROR,
  CLEAR_SEARCH_RESULTS,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  searchQuery: '',
  coins: null,
  exchanges: null,
  icos: null,
  categories: null,
  nfts: null,
};

const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case SEARCH_RESULTS_REQUEST:
      return { ...state, status: 'loading', error: null };
    case SEARCH_RESULTS_SUCCESS:
      return { ...state, status: 'idle', ...action.payload };
    case SEARCH_RESULTS_ERROR:
      return { ...state, status: 'error', error: action.payload };
    case CLEAR_SEARCH_RESULTS: {
      return initialState;
    }
    default:
      return state;
  }
};

export default searchResultsReducer;
