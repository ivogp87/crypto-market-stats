import { CANDLESTICK_CHART_SUCCESS } from '../actionTypes';
import { coinChartRequest, coinChartError } from './getCoinChart';

import { fetchCandlestickChart } from '../../apis/coinGecko';

const candlestickChartSuccess = (chartData) => ({
  type: CANDLESTICK_CHART_SUCCESS,
  payload: chartData,
});

const getCandlestickChart = (coinId, referenceCurrency, timeInterval) => async (dispatch) => {
  dispatch(coinChartRequest());

  try {
    const response = await fetchCandlestickChart(coinId, referenceCurrency, timeInterval);

    dispatch(candlestickChartSuccess(response.data));
  } catch (error) {
    dispatch(coinChartError(error));
  }
};

export default getCandlestickChart;
