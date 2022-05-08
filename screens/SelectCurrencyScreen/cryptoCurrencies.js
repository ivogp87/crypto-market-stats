import { CurrencyDetails } from '../../models';

const cryptoCurrencies = [
  new CurrencyDetails(
    'btc',
    'Bitcoin',
    'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
  ),
  new CurrencyDetails(
    'eth',
    'Ethereum',
    'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  ),
  new CurrencyDetails(
    'ltc',
    'Litecoin',
    'https://assets.coingecko.com/coins/images/2/small/litecoin.png'
  ),
  new CurrencyDetails(
    'bch',
    'Bitcoin Cash',
    'https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png'
  ),
  new CurrencyDetails(
    'bnb',
    'bnb',
    'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png'
  ),
  new CurrencyDetails(
    'eos',
    'eos',
    'https://assets.coingecko.com/coins/images/738/small/eos-eos-logo.png'
  ),
  new CurrencyDetails(
    'xrp',
    'Ripple',
    'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png'
  ),
  new CurrencyDetails(
    'xlm',
    'Stellar',
    'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png'
  ),
  new CurrencyDetails(
    'link',
    'Chainlink',
    'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png'
  ),
  new CurrencyDetails(
    'dot',
    'Polkadot',
    'https://assets.coingecko.com/coins/images/12171/small/polkadot.png?1639712644'
  ),
  new CurrencyDetails(
    'yfi',
    'Yearn.finance',
    'https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png'
  ),
  new CurrencyDetails('bits', 'Bits'),
  new CurrencyDetails('sats', 'Satoshi'),
];

export default cryptoCurrencies;
