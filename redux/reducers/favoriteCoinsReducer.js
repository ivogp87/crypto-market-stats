import {
  FAVORITE_COINS_REQUEST,
  FAVORITE_COINS_SUCCESS,
  FAVORITE_COINS_ERROR,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  favoriteCoins: null,
};

const favoriteCoinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_COINS_REQUEST:
      return { ...state, status: 'loading', error: null };
    case FAVORITE_COINS_SUCCESS:
      return { ...state, status: 'idle', favoriteCoins: action.payload };
    case FAVORITE_COINS_ERROR:
      return { ...state, status: 'error', error: action.payload, favoriteCoins: null };
    default:
      return state;
  }
};

export default favoriteCoinsReducer;
