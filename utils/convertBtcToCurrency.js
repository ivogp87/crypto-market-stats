const convertBtcToCurrency = (btcAmount, exchangeRate) =>
  btcAmount && exchangeRate ? btcAmount * exchangeRate : null;

export default convertBtcToCurrency;
