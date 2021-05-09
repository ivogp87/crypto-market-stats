import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import themes from './styles/themes';

import RootNavigator from './navigation/RootNavigator';

enableScreens();

const AppContainer = () => {
  const deviceColorScheme = useColorScheme();
  const { name: selectedTheme, useDeviceTheme } = useSelector((state) => state.settings.theme);
  const findTheme = (themeName) =>
    themes.find(({ name }) => name.toLocaleLowerCase() === themeName.toLocaleLowerCase());

  const theme =
    useDeviceTheme && deviceColorScheme
      ? findTheme(deviceColorScheme)
      : findTheme(selectedTheme) || themes[0];

  return (
    <>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <ActionSheetProvider>
        <NavigationContainer theme={theme}>
          <RootNavigator />
        </NavigationContainer>
      </ActionSheetProvider>
    </>
  );
};

export default AppContainer;
