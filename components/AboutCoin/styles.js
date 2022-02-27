import { StyleSheet } from 'react-native';

const themedStyles = (colors) =>
  StyleSheet.create({
    linksContainer: {
      backgroundColor: colors.bgSecondary,
      paddingVertical: 16,
      margin: 16,
      borderRadius: 8,
    },

    description: {
      margin: 16,
    },
  });

export default themedStyles;
