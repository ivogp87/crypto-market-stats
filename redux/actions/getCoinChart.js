import { COIN_CHART_REQUEST, COIN_CHART_SUCCESS, COIN_CHART_ERROR } from '../actionTypes';
import { fetchCoinChart } from '../../apis/coinGecko';

export const coinChartRequest = () => ({ type: COIN_CHART_REQUEST });
export const coinChartError = (error) => ({ type: COIN_CHART_ERROR, payload: error });
const coinChartSuccess = (chartData) => ({
  type: COIN_CHART_SUCCESS,
  payload: chartData,
});

const getCoinChart = (coinId, referenceCurrency, timeInterval) => async (dispatch) => {
  dispatch(coinChartRequest());
  try {
    const response = await fetchCoinChart(coinId, referenceCurrency, timeInterval);

    dispatch(coinChartSuccess(response.data));
  } catch (error) {
    dispatch(coinChartError(error));
  }
};

export default getCoinChart;
