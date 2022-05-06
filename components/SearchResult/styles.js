import { StyleSheet } from 'react-native';

const themedStyles = (colors, showBorder) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 8,
      backgroundColor: colors.bgPrimary,
      borderBottomWidth: showBorder ? 1 : 0,
      borderBottomColor: colors.borderPrimary,
    },

    coinBranding: {
      flex: 1,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },

    coinNames: {
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      paddingLeft: 8,
    },

    exchangeName: {
      paddingLeft: 16,
    },

    coinSymbol: {
      textTransform: 'uppercase',
    },

    priceContainer: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },

    prices: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 8,
    },
  });

export default themedStyles;
