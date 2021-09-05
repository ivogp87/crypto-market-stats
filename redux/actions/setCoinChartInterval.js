import { SET_COIN_CHART_INTERVAL } from '../actionTypes';

const setCoinChartInterval = (timeInterval) => ({
  type: SET_COIN_CHART_INTERVAL,
  payload: timeInterval,
});

export default setCoinChartInterval;
