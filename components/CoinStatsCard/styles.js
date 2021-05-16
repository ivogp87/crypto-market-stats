import { StyleSheet } from 'react-native';

export const coinStatsCardHeight = 56;

const themedStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 8,
      backgroundColor: colors.bgPrimary,
      height: coinStatsCardHeight,
    },

    coinBranding: {
      width: '35%',
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },

    coinNames: {
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      paddingLeft: 8,
    },

    coinSymbol: {
      textTransform: 'uppercase',
    },

    priceChange: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    priceContainer: {
      width: '35%',
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    prices: {
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingRight: 8,
    },
  });

export default themedStyles;
