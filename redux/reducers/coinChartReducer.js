import {
  COIN_CHART_REQUEST,
  COIN_CHART_SUCCESS,
  COIN_CHART_ERROR,
  CANDLESTICK_CHART_SUCCESS,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  lineChart: null,
  candlestickChart: null,
};

const coinChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case COIN_CHART_REQUEST:
      return { ...state, status: 'loading', error: null };
    case COIN_CHART_SUCCESS: {
      return { ...state, status: 'idle', lineChart: action.payload };
    }
    case COIN_CHART_ERROR:
      return { ...state, status: 'error', error: action.payload };
    case CANDLESTICK_CHART_SUCCESS:
      return { ...state, status: 'idle', candlestickChart: action.payload };
    default:
      return state;
  }
};

export default coinChartReducer;
