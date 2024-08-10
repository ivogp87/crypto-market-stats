import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import themedStyles from './styles';
import { useStyles } from '../../hooks';
import { stylePropTypes } from '../../utils';

const AppButton = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  size = 'medium',
  color = 'primary',
  variant = 'solid',
  rounded,
  stretch,
  style,
}) => {
  const styles = useStyles(themedStyles, size, color, rounded, stretch, variant);

  return (
    <Pressable
      onPress={onPress}
      style={StyleSheet.compose(styles.buttonContainer, style)}
      android_ripple={styles.ripple}
    >
      {iconLeft && <Ionicons name={iconLeft} style={styles.iconLeft} />}
      <Text style={styles.text}>{title}</Text>
      {iconRight && <Ionicons name={iconRight} style={styles.iconRight} />}
    </Pressable>
  );
};

AppButton.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  onPress: PropTypes.func.isRequired,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'danger']),
  variant: PropTypes.oneOf(['solid', 'outline']),
  rounded: PropTypes.bool,
  stretch: PropTypes.bool,
  style: stylePropTypes,
};

export default AppButton;
