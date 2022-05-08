import {
  SET_SORTING_OPTION,
  TOGGLE_FAVORITE_COIN,
  SET_COIN_CHART_INTERVAL,
  SET_COIN_CHART_TYPE,
  SET_CHART_VARIANT,
  SET_THEME,
  SELECT_CURRENCY,
  CURRENCY_TO_FIND,
} from '../actionTypes';
import { themeNames } from '../../styles/themes';

const initialState = {
  theme: {
    name: themeNames[0],
    useDeviceTheme: true,
  },
  sortingOptions: {
    category: null, // null - show all categories
    orderBy: 'market_cap_desc',
    priceChangeInterval: '24h',
  },
  referenceCurrency: 'usd',
  currencyToFind: '', // used for searching in the list of supported reference currencies
  showSparkline: true,
  favoriteCoinIds: [],
  coinChartSettings: {
    timeInterval: 1, // time interval for the chart data: one of [1, 7, 14, 30, 90, 180, 365, 'max']
    chartType: 'price', // price | market cap | volume
    chartVariant: 'line chart', // line chart | candlestick chart
  },
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORTING_OPTION:
      return { ...state, sortingOptions: { ...state.sortingOptions, ...action.payload } };
    case TOGGLE_FAVORITE_COIN: {
      const coinId = action.payload;
      const { favoriteCoinIds } = state;

      const favoriteCoins = favoriteCoinIds.includes(coinId)
        ? favoriteCoinIds.filter((id) => id !== coinId)
        : [...favoriteCoinIds, coinId];

      return { ...state, favoriteCoinIds: favoriteCoins };
    }
    case SET_COIN_CHART_INTERVAL: {
      const newCoinChartSettings = { ...state.coinChartSettings, timeInterval: action.payload };
      return { ...state, coinChartSettings: newCoinChartSettings };
    }
    case SET_COIN_CHART_TYPE: {
      const newCoinChartSettings = { ...state.coinChartSettings, chartType: action.payload };
      return { ...state, coinChartSettings: newCoinChartSettings };
    }
    case SET_CHART_VARIANT: {
      const newCoinChartSettings = { ...state.coinChartSettings, chartVariant: action.payload };
      return { ...state, coinChartSettings: newCoinChartSettings };
    }
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SELECT_CURRENCY:
      return { ...state, referenceCurrency: action.payload };
    case CURRENCY_TO_FIND:
      return { ...state, currencyToFind: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
