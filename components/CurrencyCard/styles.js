import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },

  currencyDetails: {
    flexDirection: 'row',
  },

  logoContainer: {
    minWidth: 40,
  },

  currencyNames: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    textTransform: 'capitalize',
    marginRight: 16,
  },

  symbol: {
    textTransform: 'uppercase',
  },
});

export default styles;
