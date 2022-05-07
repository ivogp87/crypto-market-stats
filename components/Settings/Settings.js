import React from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';

import themedStyles from './styles';
import { useStyles } from '../../hooks';

import Heading from '../Heading';
import DividedRow from '../DividedRow';

const Settings = ({ themeName, onThemeChangePress }) => {
  const styles = useStyles(themedStyles);

  return (
    <>
      <Heading iconName={Platform.OS === 'android' ? 'md-settings-sharp' : 'ios-settings-sharp'}>
        Settings
      </Heading>
      <View style={styles.settingsList}>
        <DividedRow textLeft="Theme" textRight={themeName} onPress={onThemeChangePress} />
      </View>
    </>
  );
};

Settings.propTypes = {
  themeName: PropTypes.string.isRequired,
  onThemeChangePress: PropTypes.func.isRequired,
};

export default Settings;
