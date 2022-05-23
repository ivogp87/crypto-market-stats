import { StyleSheet } from 'react-native';

const themedStyles = (colors) =>
  StyleSheet.create({
    aboutUs: {
      backgroundColor: colors.bgSecondary,
      padding: 16,
      margin: 16,
      borderRadius: 8,
    },

    link: {
      marginBottom: 16,
    },
  });

export default themedStyles;
