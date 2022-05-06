import { StyleSheet } from 'react-native';

const themedStyles = (colors) =>
  StyleSheet.create({
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingTop: 4,
      paddingBottom: 6,
      backgroundColor: colors.bgPrimary,
      borderRadius: 8,
    },

    textInput: {
      flex: 1,
      color: colors.textPrimary,
    },
  });

export default themedStyles;
