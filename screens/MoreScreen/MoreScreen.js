import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '../../redux/actions';
import { actionSheetThemedStyles, sharedStyles } from '../../styles';
import { themeNames } from '../../styles/themes';
import { useTheme, useStyles } from '../../hooks';
import { capitalizeString } from '../../utils';

import Settings from '../../components/Settings';
import FooterCredits from '../../components/FooterCredits';

const MoreScreen = ({ navigation }) => {
  const { name: currentTheme, useDeviceTheme } = useSelector((state) => state.settings.theme);
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);

  const dispatch = useDispatch();

  const themeName = useTheme().name;
  const windowHeight = useWindowDimensions().height;

  const actionSheetStyles = useStyles(actionSheetThemedStyles, themeName, windowHeight);
  const { showActionSheetWithOptions } = useActionSheet();

  const handleThemeChangePress = () => {
    const cancelButtonIndex = 3;
    const themes = ['Auto', ...themeNames.map((name) => capitalizeString(name))]; // Auto - automatically switch to light/dark based on device settings

    showActionSheetWithOptions(
      {
        options: [...themes, 'Cancel'],
        cancelButtonIndex,
        title: 'Change Theme',
        ...actionSheetStyles,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButtonIndex) {
          if (buttonIndex === 0) {
            dispatch(setTheme(currentTheme, true));
          } else {
            dispatch(setTheme(themes[buttonIndex].toLowerCase(), false));
          }
        }
      }
    );
  };

  const handleCurrencyChangePress = () => {
    navigation.navigate('Select Currency');
  };

  return (
    <ScrollView contentContainerStyle={sharedStyles.screenContainer}>
      <Settings
        themeName={capitalizeString(useDeviceTheme ? 'Auto' : currentTheme)}
        currencyName={referenceCurrency.toUpperCase()}
        onThemeChangePress={handleThemeChangePress}
        onCurrencyChangePress={handleCurrencyChangePress}
      />
      <FooterCredits />
    </ScrollView>
  );
};

export default MoreScreen;
