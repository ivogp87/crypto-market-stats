import {
  EXCHANGE_DETAILS_REQUEST,
  EXCHANGE_DETAILS_SUCCESS,
  EXCHANGE_DETAILS_ERROR,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  exchangeDetails: {}, // holds a list of exchanges, the exchange id is used as a key
};

const exchangeDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXCHANGE_DETAILS_REQUEST:
      return { ...state, status: 'loading', error: null };
    case EXCHANGE_DETAILS_SUCCESS: {
      const { exchangeId, exchangeDetails } = action.payload;
      return {
        ...state,
        exchangeDetails: { ...state.exchangeDetails, [exchangeId]: exchangeDetails },
        status: 'idle',
      };
    }
    case EXCHANGE_DETAILS_ERROR:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export default exchangeDetailsReducer;
