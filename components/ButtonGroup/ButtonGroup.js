import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import themedStyles, { itemStyles } from './styles';
import { useStyles } from '../../hooks';
import { stylePropTypes } from '../../utils';

import AppButton from '../AppButton';

const ButtonGroup = ({ children, color = 'primary', style }) => {
  const styles = useStyles(themedStyles, color);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={StyleSheet.compose(styles.buttonGroup, style)}
    >
      {children}
    </ScrollView>
  );
};

const Item = ({ size = 'small', style, ...props }) => (
  <AppButton {...props} size={size} style={StyleSheet.compose(itemStyles.button, style)} />
);

Item.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  style: stylePropTypes,
};

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  style: stylePropTypes,
};

ButtonGroup.Item = Item;

export default ButtonGroup;
