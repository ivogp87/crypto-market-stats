import { SET_SORTING_OPTION, TOGGLE_FAVORITE_COIN } from '../actionTypes';
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
  showSparkline: true,
  favoriteCoinIds: [],
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
    default:
      return state;
  }
};

export default settingsReducer;
