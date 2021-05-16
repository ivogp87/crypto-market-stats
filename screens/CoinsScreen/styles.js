import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },

  buttonGroup: {
    marginBottom: 16,
  },

  coins: {
    alignSelf: 'flex-start',
  },

  emptyFavoritesList: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadMoreButton: {
    marginTop: 16,
    marginHorizontal: 16,
  },
});

export default styles;
