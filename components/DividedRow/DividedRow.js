import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './styles';
import AppText from '../AppText';

const DividedRow = ({ textLeft, textRight, children }) => (
  <View style={styles.dividedRow}>
    <AppText size="large" style={styles.textLeft}>
      {textLeft}
    </AppText>
    {textRight && <AppText size="large">{textRight}</AppText>}
    {!!children && !textRight && children}
  </View>
);

DividedRow.propTypes = {
  textLeft: PropTypes.string.isRequired,
  textRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

DividedRow.defaultProps = {
  textRight: null,
  children: null,
};

export default DividedRow;
