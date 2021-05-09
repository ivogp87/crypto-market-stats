import { StyleSheet } from 'react-native';
import { font } from '../../styles';

const themedStyles = (colors, size, color, bold) => {
  const { textPrimary, textSecondary, success, info, warning, danger } = colors;
  const textColors = {
    primary: textPrimary,
    secondary: textSecondary,
    success,
    info,
    warning,
    danger,
  };

  return StyleSheet.create({
    text: {
      fontSize: size === 'extra large' ? font.xLarge : font[size],
      color: textColors[color],
      fontWeight: bold ? 'bold' : 'normal',
    },
  });
};

export default themedStyles;
