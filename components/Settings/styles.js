import { StyleSheet } from 'react-native';

const themedStyles = (colors) =>
  StyleSheet.create({
    settingsList: {
      backgroundColor: colors.bgSecondary,
      paddingVertical: 16,
      margin: 16,
      borderRadius: 8,
    },
  });

export default themedStyles;
