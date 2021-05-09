import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import coinsReducer from './coinsReducer';
import settingsReducer from './settingsReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  coins: coinsReducer,
  settings: settingsReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
