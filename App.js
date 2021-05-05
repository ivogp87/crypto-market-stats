import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/storeConfig';
import AppContainer from './AppContainer';

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoading />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}
