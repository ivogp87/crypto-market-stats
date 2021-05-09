import { SET_SORTING_OPTION } from '../actionTypes';
import { themeNames } from '../../styles/themes';

const initialState = {
  theme: {
    name: themeNames[0],
    useDeviceTheme: true,
  },
  referenceCurrency: 'usd',
  sortingOptions: {
    category: null,
    orderBy: 'market_cap_desc',
    timeInterval: '24h',
    showFullList: true,
  },
  showSparkline: true,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORTING_OPTION:
      return { ...state, sortingOptions: { ...state.sortingOptions, ...action.payload } };
    default:
      return state;
  }
};

export default settingsReducer;
