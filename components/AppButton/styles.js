import { StyleSheet } from 'react-native';
import { font } from '../../styles';

const themedStyles = (colors, size, color, rounded, stretch, variant) => {
  const { textPrimary, bgPrimary, bgSecondary, info, warning, danger, success, ripple } = colors;
  const buttonColors = {
    primary: bgSecondary,
    secondary: bgPrimary,
    info,
    warning,
    danger,
    success,
  };

  return StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: stretch ? 'stretch' : 'baseline',
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: variant === 'solid' ? buttonColors[color] : bgPrimary,
      borderRadius: rounded ? 16 : 4,
      overflow: 'hidden',
      borderColor: variant === 'solid' ? 'transparent' : buttonColors[color],
      borderWidth: variant === 'solid' ? 0 : 1,
      borderStyle: 'solid',
    },

    ripple: { color: ripple },

    text: {
      color: textPrimary,
      fontSize: size === 'small' ? font.medium : font.large,
      textTransform: 'capitalize',
    },

    iconLeft: { marginRight: 4, color: textPrimary, fontSize: 16 },

    iconRight: { marginLeft: 4, color: textPrimary, fontSize: 16 },
  });
};

export default themedStyles;
