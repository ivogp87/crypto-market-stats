import { StyleSheet } from 'react-native';

export const exchangeStatsCardHeight = 48;

const themedStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.bgPrimary,
      height: exchangeStatsCardHeight,
    },

    exchangeBranding: {
      width: '60%',
      flexDirection: 'row',
      alignItems: 'center',
    },

    exchangeRank: {
      minWidth: 40,
      paddingRight: 8,
    },

    exchangeName: {
      paddingLeft: 16,
    },

    tradeVolume: {
      paddingLeft: 16,
      width: '40%',
      alignItems: 'flex-end',
    },
  });

export default themedStyles;
