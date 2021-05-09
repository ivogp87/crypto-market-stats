import { StyleSheet } from 'react-native';
import spacing from './spacing';

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.medium,
  },

  marginTop: {
    marginTop: spacing.medium,
  },

  marginBottom: {
    marginBottom: spacing.medium,
  },

  marginHorizontal: {
    marginHorizontal: spacing.small,
  },
});

export default screenStyles;
