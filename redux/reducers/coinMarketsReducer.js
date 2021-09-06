import { COIN_MARKETS_REQUEST, COIN_MARKETS_SUCCESS, COIN_MARKETS_ERROR } from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  coinMarkets: {}, // holds a list of coin markets, the coin id is used as a key
};

const coinMarketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COIN_MARKETS_REQUEST:
      return { ...state, status: 'loading', error: null };
    case COIN_MARKETS_SUCCESS: {
      const { coinId, coinMarkets } = action.payload;
      return {
        ...state,
        coinMarkets: { ...state.coinMarkets, [coinId]: coinMarkets },
        status: 'idle',
      };
    }
    case COIN_MARKETS_ERROR:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export default coinMarketsReducer;
