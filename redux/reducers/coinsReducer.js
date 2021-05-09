import {
  COINS_REQUEST,
  COINS_ERROR,
  COINS_SUCCESS,
  COINS_NEXT_PAGE_REQUEST,
  COINS_NEXT_PAGE_SUCCESS,
  COINS_NEXT_PAGE_ERROR,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  coins: null,
};

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COINS_REQUEST:
      return { ...state, status: 'loading', error: null };
    case COINS_SUCCESS:
      return { ...state, status: 'idle', coins: action.payload };
    case COINS_ERROR:
      return { ...state, status: 'error', error: action.payload, coins: null };
    case COINS_NEXT_PAGE_REQUEST:
      return { ...state, status: 'loading next page', error: null };
    case COINS_NEXT_PAGE_SUCCESS:
      return { ...state, status: 'idle', coins: [...state.coins, ...action.payload] };
    case COINS_NEXT_PAGE_ERROR:
      return { ...state, status: 'error loading next page', error: action.payload };
    default:
      return state;
  }
};

export default coinsReducer;
