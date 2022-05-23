import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';

import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';

import { store, persistor } from './redux/storeConfig';
import AppContainer from './AppContainer';

enableScreens();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const hideSplashScreen = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          setAppIsReady(true);
        }}
      >
        <AppContainer onLayout={hideSplashScreen} />
      </PersistGate>
    </Provider>
  );
}
