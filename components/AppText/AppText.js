import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { font } from '../../styles';
import { useColors } from '../../hooks';

const AppText = ({ size, color, bold, style, children, ...rest }) => {
  const { textPrimary, textSecondary, success, info, warning, danger } = useColors();
  const fontSize = size === 'extra large' ? font.xLarge : font[size];

  const colors = {
    primary: textPrimary,
    secondary: textSecondary,
    success,
    info,
    warning,
    danger,
  };

  return (
    <Text
      style={StyleSheet.compose(
        { fontSize, fontWeight: bold ? 'bold' : 'normal', color: colors[color] },
        style
      )}
      {...rest}
    >
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

AppText.defaultProps = {
  size: 'medium',
  color: 'primary',
  bold: false,
  style: {},
};

export default AppText;
