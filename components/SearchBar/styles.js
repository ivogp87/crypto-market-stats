import { StyleSheet, Platform } from 'react-native';

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
      minWidth: Platform.OS === 'ios' ? '70%' : 'auto',
    },

    textInput: {
      flex: 1,
      color: colors.textPrimary,
      paddingVertical: Platform.OS === 'ios' ? 4 : 0,
    },
  });

export default themedStyles;
