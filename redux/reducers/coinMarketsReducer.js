import {
  COIN_MARKETS_REQUEST,
  COIN_MARKETS_SUCCESS,
  COIN_MARKETS_ERROR,
  COIN_MARKETS_NEXT_PAGE_REQUEST,
  COIN_MARKETS_NEXT_PAGE_SUCCESS,
  COIN_MARKETS_NEXT_PAGE_ERROR,
} from '../actionTypes';

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
    case COIN_MARKETS_NEXT_PAGE_REQUEST:
      return { ...state, status: 'loading next page', error: null };
    case COIN_MARKETS_NEXT_PAGE_SUCCESS: {
      const { coinId, coinMarkets } = action.payload;
      const tickers = [...state.coinMarkets[coinId].tickers, ...coinMarkets.tickers];
      const updatedCoinMarkets = { ...coinMarkets, tickers };
      return {
        ...state,
        coinMarkets: { ...state.coinMarkets, [coinId]: updatedCoinMarkets },
        status: 'idle',
      };
    }
    case COIN_MARKETS_NEXT_PAGE_ERROR:
      return { ...state, status: 'error loading next page', error: action.payload };
    default:
      return state;
  }
};

export default coinMarketsReducer;
