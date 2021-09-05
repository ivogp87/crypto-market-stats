import currencyFormatter from 'currency-formatter';
import * as Localization from 'expo-localization';
import abbreviateNumber from './abbreviateNumber';
import getCurrencySymbol from './getCurrencySymbol';

// Returns a string with a language-sensitive representation. The number is abbreviated - 20 000 => $20 K
// Number.toLocaleString() and Intl.NumberFormat() are non supported by React Native
const formatAndAbbreviateCurrency = (amount, currencyCode) => {
  if (!amount && amount !== 0) return 'n/a';

  const { currency } = Localization || 'USD';
  const { symbolOnLeft, spaceBetweenAmountAndSymbol } = currencyFormatter.findCurrency(currency);
  const digits = amount < 0.01 ? 4 : 2;
  const shortNumber = amount < 1000 ? parseFloat(amount.toFixed(digits)) : abbreviateNumber(amount);
  const currencySymbol = getCurrencySymbol(currencyCode || currency);

  return symbolOnLeft
    ? `${currencySymbol}${spaceBetweenAmountAndSymbol ? ' ' : ''}${shortNumber}`
    : `${shortNumber}${spaceBetweenAmountAndSymbol ? ' ' : ''}${currencySymbol}`;
};

export default formatAndAbbreviateCurrency;
