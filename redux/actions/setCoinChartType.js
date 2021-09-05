import { SET_COIN_CHART_TYPE } from '../actionTypes';

const setCoinChartType = (chartDataType) => ({
  type: SET_COIN_CHART_TYPE,
  payload: chartDataType,
});

export default setCoinChartType;
