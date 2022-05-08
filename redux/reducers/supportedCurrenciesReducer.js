import {
  SUPPORTED_CURRENCIES_REQUEST,
  SUPPORTED_CURRENCIES_SUCCESS,
  SUPPORTED_CURRENCIES_ERROR,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  supportedCurrencies: null,
};

const supportedCurrenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUPPORTED_CURRENCIES_REQUEST:
      return { ...state, status: 'loading', error: null };
    case SUPPORTED_CURRENCIES_SUCCESS:
      return { ...state, status: 'idle', supportedCurrencies: action.payload };
    case SUPPORTED_CURRENCIES_ERROR:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export default supportedCurrenciesReducer;
