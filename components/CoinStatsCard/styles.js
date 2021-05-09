import { StyleSheet } from 'react-native';
import { spacing } from '../../styles';

const themedStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: spacing.small,
      backgroundColor: colors.bgPrimary,
      height: 56,
    },

    coinBranding: {
      width: '35%',
      paddingLeft: spacing.small,
      paddingRight: spacing.medium,
      flexDirection: 'row',
      alignItems: 'center',
    },

    coinNames: {
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      paddingLeft: spacing.small,
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
      paddingLeft: spacing.medium,
      paddingRight: spacing.small,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    prices: {
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingRight: spacing.small,
    },
  });

export default themedStyles;
