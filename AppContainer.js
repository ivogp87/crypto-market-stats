import React, { useRef, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PropTypes from 'prop-types';
import * as Analytics from 'expo-firebase-analytics';
import * as Notifications from 'expo-notifications';

import themes from './styles/themes';
import { sharedStyles } from './styles';
import { registerForPushNotificationsAsync } from './utils';

import RootNavigator from './navigation/RootNavigator';

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // original was false
    shouldSetBadge: false,
  }),
});

const AppContainer = ({ onLayout }) => {
  const deviceColorScheme = useColorScheme();
  const { name: selectedTheme, useDeviceTheme } = useSelector((state) => state.settings.theme);
  const findTheme = (themeName) =>
    themes.find(({ name }) => name.toLowerCase() === themeName?.toLowerCase());

  const theme =
    useDeviceTheme && deviceColorScheme
      ? findTheme(deviceColorScheme)
      : findTheme(selectedTheme) || themes[0];

  const navigationRef = useRef();
  const routeNameRef = useRef();

  const handleNavigationReady = () => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
  };

  const handleStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;

    if (previousRouteName !== currentRouteName) {
      await Analytics.logEvent('screen_view', currentRouteName);
    }

    routeNameRef.current = currentRouteName;
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <GestureHandlerRootView
      style={{ ...sharedStyles.flexOne, backgroundColor: theme.colors.background }}
    >
      <View onLayout={onLayout} style={sharedStyles.flexOne}>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
        <ActionSheetProvider>
          <NavigationContainer
            theme={theme}
            ref={navigationRef}
            onReady={handleNavigationReady}
            onStateChange={handleStateChange}
          >
            <RootNavigator />
          </NavigationContainer>
        </ActionSheetProvider>
      </View>
    </GestureHandlerRootView>
  );
};

AppContainer.propTypes = {
  onLayout: PropTypes.func.isRequired,
};

export default AppContainer;
