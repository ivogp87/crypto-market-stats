import {
  EXCHANGE_VOLUME_CHART_REQUEST,
  EXCHANGE_VOLUME_CHART_SUCCESS,
  EXCHANGE_VOLUME_CHART_ERROR,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  volumeChart: null,
};

const exchangeChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXCHANGE_VOLUME_CHART_REQUEST:
      return { ...state, status: 'loading', error: null };
    case EXCHANGE_VOLUME_CHART_SUCCESS:
      return { ...state, status: 'idle', volumeChart: action.payload };
    case EXCHANGE_VOLUME_CHART_ERROR:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export default exchangeChartReducer;
