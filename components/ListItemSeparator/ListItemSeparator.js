import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import themedStyles from './styles';
import { useStyles } from '../../hooks';

const ListItemSeparator = ({ color = 'primary', size, style }) => {
  const styles = useStyles(themedStyles);

  return (
    <View
      style={StyleSheet.compose([styles[color], size ? { height: size } : styles.size], style)}
    />
  );
};

ListItemSeparator.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.number,
  style: PropTypes.shape({}),
};

export default ListItemSeparator;
