import currencyFormatter from 'currency-formatter';
import * as Localization from 'expo-localization';
import getCurrencySymbol from './getCurrencySymbol';

// Returns a string with a language-sensitive representation.
// formatCurrency(100200.300) => '$100,200.30'
// Number.toLocaleString() and Intl.NumberFormat() are non supported by React Native
const formatCurrency = (amount, currencyCode) => {
  if (!amount && amount !== 0) return 'n/a';

  const { currency = 'USD' } = Localization;
  const currencySymbol = getCurrencySymbol(currencyCode || currency);
  const { symbolOnLeft, spaceBetweenAmountAndSymbol } = currencyFormatter.findCurrency(currency);

  if (amount < 1) {
    const formattedNumber = parseFloat(amount.toFixed(4));
    return symbolOnLeft
      ? `${currencySymbol}${spaceBetweenAmountAndSymbol ? ' ' : ''}${formattedNumber}`
      : `${formattedNumber}${spaceBetweenAmountAndSymbol ? ' ' : ''}${currencySymbol}`;
  }

  return currencyFormatter.format(amount, {
    locale: Localization.locale,
    symbol: currencySymbol,
  });
};

export default formatCurrency;
