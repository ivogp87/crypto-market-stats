import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { stylePropTypes } from '../../utils';

import AppText from '../AppText';

const ErrorMessage = ({ message, children, stretch, style }) => (
  <View style={StyleSheet.compose(stretch ? styles.stretchedContainer : styles.container, style)}>
    <AppText color="danger" size="large">
      {message}
    </AppText>
    <View style={styles.childrenContainer}>{children}</View>
  </View>
);

ErrorMessage.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  children: PropTypes.node,
  stretch: PropTypes.bool,
  style: stylePropTypes,
};

ErrorMessage.defaultProps = {
  children: null,
  stretch: false,
  style: null,
};

export default ErrorMessage;
