import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';

import { useColors } from '../../hooks';

import styles from './styles';
import AppText from '../AppText';

const DividedRow = ({ textLeft, textRight, children, onPress }) => {
  const colors = useColors();

  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.dividedRow}
      android_ripple={onPress ? { color: colors.ripple } : {}}
    >
      <AppText size="large" style={styles.textLeft}>
        {textLeft}
      </AppText>
      {textRight && <AppText size="large">{textRight}</AppText>}
      {!!children && !textRight && children}
    </Pressable>
  );
};

DividedRow.propTypes = {
  textLeft: PropTypes.string.isRequired,
  textRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  onPress: PropTypes.func,
};

DividedRow.defaultProps = {
  textRight: null,
  children: null,
  onPress: null,
};

export default DividedRow;
