import { StyleSheet } from 'react-native';

export const marketPairCardHeight = 56;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    height: marketPairCardHeight,
  },

  leftColumn: {
    width: '35%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  marketPair: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    marginLeft: 4,
  },

  price: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  volume: {
    width: '35%',
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default styles;
