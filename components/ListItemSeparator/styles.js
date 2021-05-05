import { StyleSheet } from 'react-native';

const themedStyles = (colors) =>
  StyleSheet.create({
    primary: {
      backgroundColor: colors.borderPrimary,
    },
    secondary: {
      backgroundColor: colors.borderSecondary,
    },
    size: {
      height: 1,
    },
  });

export default themedStyles;
