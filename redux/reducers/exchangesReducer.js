import {
  EXCHANGES_REQUEST,
  EXCHANGES_SUCCESS,
  EXCHANGES_ERROR,
  EXCHANGES_NEXT_PAGE_REQUEST,
  EXCHANGES_NEXT_PAGE_SUCCESS,
  EXCHANGES_NEXT_PAGE_ERROR,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  exchanges: null,
};

const exchangesReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXCHANGES_REQUEST:
      return { ...state, status: 'loading', error: null };
    case EXCHANGES_SUCCESS:
      return { ...state, status: 'idle', exchanges: action.payload };
    case EXCHANGES_ERROR:
      return { ...state, status: 'error', error: action.payload, exchanges: null };
    case EXCHANGES_NEXT_PAGE_REQUEST:
      return { ...state, status: 'loading next page', error: null };
    case EXCHANGES_NEXT_PAGE_SUCCESS:
      return { ...state, status: 'idle', exchanges: [...state.exchanges, ...action.payload] };
    case EXCHANGES_NEXT_PAGE_ERROR:
      return { ...state, status: 'error loading next page', error: action.payload };
    default:
      return state;
  }
};

export default exchangesReducer;
