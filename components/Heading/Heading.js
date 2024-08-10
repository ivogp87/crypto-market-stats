import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useColors } from '../../hooks';
import styles from './styles';
import AppText from '../AppText';

const Heading = ({ iconName, children, style }) => {
  const { textPrimary } = useColors();

  return (
    <View style={StyleSheet.compose(styles.heading, style)}>
      {iconName && (
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} color={textPrimary} size={20} />
        </View>
      )}
      <AppText size="extra large">{children}</AppText>
    </View>
  );
};

Heading.propTypes = {
  iconName: PropTypes.string,
  children: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Heading;
