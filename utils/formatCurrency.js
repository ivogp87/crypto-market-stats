import currencyFormatter from 'currency-formatter';
import * as Localization from 'expo-localization';
import getCurrencySymbol from './getCurrencySymbol';

// Returns a string with a language-sensitive representation.
// formatCurrency(100200.300) => '$100,200.30'
// Number.toLocaleString() and Intl.NumberFormat() are non supported by React Native
const formatCurrency = (amount, currencyCode) => {
  if (amount === null) return 'n/a';

  const { currency } = Localization || 'USD';
  const currencySymbol = getCurrencySymbol(currencyCode);
  const { symbolOnLeft, spaceBetweenAmountAndSymbol } = currencyFormatter.findCurrency(currency);

  if (amount < 1) {
    const formattedNumber = amount.toPrecision(2);
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
