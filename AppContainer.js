import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PropTypes from 'prop-types';

import themes from './styles/themes';
import { sharedStyles } from './styles';

import RootNavigator from './navigation/RootNavigator';

enableScreens();

const AppContainer = ({ onLayout }) => {
  const deviceColorScheme = useColorScheme();
  const { name: selectedTheme, useDeviceTheme } = useSelector((state) => state.settings.theme);
  const findTheme = (themeName) =>
    themes.find(({ name }) => name.toLocaleLowerCase() === themeName.toLocaleLowerCase());

  const theme =
    useDeviceTheme && deviceColorScheme
      ? findTheme(deviceColorScheme)
      : findTheme(selectedTheme) || themes[0];

  return (
    <GestureHandlerRootView style={sharedStyles.flexOne}>
      <View onLayout={onLayout} style={sharedStyles.flexOne}>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
        <ActionSheetProvider>
          <NavigationContainer theme={theme}>
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
