import {
  BTC_EXCHANGE_RATES_REQUEST,
  BTC_EXCHANGE_RATES_SUCCESS,
  BTC_EXCHANGE_RATES_ERROR,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  btcExchangeRates: null,
  lastUpdated: null,
};

const btcExchangeRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case BTC_EXCHANGE_RATES_REQUEST:
      return { ...state, status: 'loading', error: null };
    case BTC_EXCHANGE_RATES_SUCCESS: {
      const { btcExchangeRates, lastUpdated } = action.payload;
      return { ...state, status: 'idle', btcExchangeRates, lastUpdated };
    }
    case BTC_EXCHANGE_RATES_ERROR:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export default btcExchangeRatesReducer;
