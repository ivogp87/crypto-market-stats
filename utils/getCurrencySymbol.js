import currencyFormatter from 'currency-formatter';

const cryptoSymbols = {
  ADA: '₳',
  BCH: 'Ƀ',
  BSV: 'Ɓ',
  BTC: '₿',
  DAI: '◈',
  DOGE: 'Ð',
  EOS: 'ε',
  ETC: 'ξ',
  ETH: 'Ξ',
  LTC: 'Ł',
  MKR: 'Μ',
  REP: 'Ɍ',
  STEEM: 'ȿ',
  USDT: '₮',
  XMR: 'ɱ',
  XRP: '✕',
  XTZ: 'ꜩ',
  ZEC: 'ⓩ',
};

const getCurrencySymbol = (currencyCode) => {
  const uppercaseCode = currencyCode.toUpperCase();
  const currencyInfo = currencyFormatter.findCurrency(uppercaseCode);
  const symbol = currencyInfo?.symbol || cryptoSymbols[uppercaseCode] || uppercaseCode;

  return symbol;
};

export default getCurrencySymbol;
