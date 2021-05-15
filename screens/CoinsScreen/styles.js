import { StyleSheet } from 'react-native';
import { spacing } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.medium,
  },

  buttonGroup: {
    marginBottom: spacing.medium,
  },

  coins: {
    alignSelf: 'flex-start',
  },

  emptyFavoritesList: {
    flex: 1,
    padding: spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadMoreButton: {
    marginTop: spacing.medium,
    marginHorizontal: spacing.small,
  },
});

export default styles;
