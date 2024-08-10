import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { useColors } from '../../hooks';
import { stylePropTypes } from '../../utils';

const Spinner = ({ size = 'small', stretch, style }) => {
  const { textPrimary } = useColors();

  return (
    <View style={StyleSheet.compose(stretch ? styles.spinnerStretched : styles.spinner, style)}>
      <ActivityIndicator color={textPrimary} size={size} />
    </View>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  style: stylePropTypes,
  stretch: PropTypes.bool,
};

export default Spinner;
