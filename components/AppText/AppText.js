import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import themedStyles from './styles';
import { useStyles } from '../../hooks';

const AppText = ({ size = 'medium', color = 'primary', bold, style, children, ...rest }) => {
  const styles = useStyles(themedStyles, size, color, bold);
  return (
    <Text style={StyleSheet.compose(styles.text, style)} {...rest}>
      {children}
    </Text>
  );
};

AppText.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'extra large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger']),
  bold: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node.isRequired,
};

export default AppText;
