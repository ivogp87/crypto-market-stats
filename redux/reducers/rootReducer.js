import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import coinsReducer from './coinsReducer';
import favoriteCoinsReducer from './favoriteCoinsReducer';
import exchangesReducer from './exchangesReducer';
import btcExchangeRatesReducer from './btcExchangeRatesReducer';
import coinChartReducer from './coinChartReducer';
import coinDetailsReducer from './coinDetailsReducer';
import settingsReducer from './settingsReducer';
import coinMarketsReducer from './coinMarketsReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  coins: coinsReducer,
  favoriteCoins: favoriteCoinsReducer,
  exchanges: exchangesReducer,
  btcExchangeRates: btcExchangeRatesReducer,
  coinChart: coinChartReducer,
  coinDetails: coinDetailsReducer,
  settings: settingsReducer,
  coinMarkets: coinMarketsReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
