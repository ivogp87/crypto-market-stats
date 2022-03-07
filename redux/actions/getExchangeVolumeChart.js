import {
  EXCHANGE_VOLUME_CHART_REQUEST,
  EXCHANGE_VOLUME_CHART_SUCCESS,
  EXCHANGE_VOLUME_CHART_ERROR,
} from '../actionTypes';
import { fetchExchangeChart } from '../../apis/coinGecko';

const getExchangeChartRequest = () => ({ type: EXCHANGE_VOLUME_CHART_REQUEST });
const getExchangeChartError = (error) => ({ type: EXCHANGE_VOLUME_CHART_ERROR, payload: error });
const getExchangeVolumeChartSuccess = (chartData) => ({
  type: EXCHANGE_VOLUME_CHART_SUCCESS,
  payload: chartData,
});

const getExchangeVolumeChart = (exchangeId, timeInterval) => async (dispatch) => {
  dispatch(getExchangeChartRequest());

  try {
    const response = await fetchExchangeChart(exchangeId, timeInterval);
    dispatch(getExchangeVolumeChartSuccess(response.data));
  } catch (error) {
    dispatch(getExchangeChartError(error));
  }
};

export default getExchangeVolumeChart;
