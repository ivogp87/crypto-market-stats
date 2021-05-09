import { StyleSheet } from 'react-native';
import { spacing } from '../../styles';

const themedStyles = (colors, color) =>
  StyleSheet.create({
    buttonGroup: {
      backgroundColor: color === 'primary' ? colors.bgPrimary : colors.bgSecondary,
      minHeight: 42,
      padding: spacing.small,
      paddingRight: 0,
    },
  });

export const itemStyles = StyleSheet.create({
  button: {
    marginRight: spacing.small,
  },
});

export default themedStyles;
