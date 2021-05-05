import currencyFormatter from 'currency-formatter';
import * as Localization from 'expo-localization';
import abbreviateNumber from './abbreviateNumber';
import getCurrencySymbol from './getCurrencySymbol';

// Returns a string with a language-sensitive representation. The number is abbreviated - 20 000 => $20 K
// Number.toLocaleString() and Intl.NumberFormat() are non supported by React Native
const formatAndAbbreviateCurrency = (amount, currencyCode) => {
  if (amount === null) return 'n/a';

  const { currency } = Localization || 'USD';
  const { symbolOnLeft, spaceBetweenAmountAndSymbol } = currencyFormatter.findCurrency(currency);

  const shortNumber = amount > 1 ? abbreviateNumber(amount) : amount.toPrecision(2);
  const currencySymbol = getCurrencySymbol(currencyCode);

  return symbolOnLeft
    ? `${currencySymbol}${spaceBetweenAmountAndSymbol ? ' ' : ''}${shortNumber}`
    : `${shortNumber}${spaceBetweenAmountAndSymbol ? ' ' : ''}${currencySymbol}`;
};

export default formatAndAbbreviateCurrency;
