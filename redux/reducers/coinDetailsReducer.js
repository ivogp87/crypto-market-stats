import { COIN_DETAILS_REQUEST, COIN_DETAILS_SUCCESS, COIN_DETAILS_ERROR } from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  coinDetails: {}, // holds a list of coins, the coin id is the key
};

const coinDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COIN_DETAILS_REQUEST:
      return { ...state, status: 'loading', error: null };
    case COIN_DETAILS_SUCCESS: {
      const { coinId, coinDetails } = action.payload;
      return {
        ...state,
        coinDetails: { ...state.coinDetails, [coinId]: coinDetails },
        status: 'idle',
      };
    }
    case COIN_DETAILS_ERROR:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export default coinDetailsReducer;
