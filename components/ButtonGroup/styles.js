import { StyleSheet } from 'react-native';

const themedStyles = (colors, color) =>
  StyleSheet.create({
    buttonGroup: {
      backgroundColor: color === 'primary' ? colors.bgPrimary : colors.bgSecondary,
      minHeight: 42,
      paddingVertical: 8,
      paddingLeft: 16,
    },
  });

export const itemStyles = StyleSheet.create({
  button: {
    marginRight: 16,
  },
});

export default themedStyles;
