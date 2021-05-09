import { ActionSheetOption } from '../../models';

export const orderByOptions = [
  new ActionSheetOption('Market Cap Descending', 'market_cap_desc', 'Market Cap', 'arrow-down'),
  new ActionSheetOption('Market Cap Ascending', 'market_cap_asc', 'Market Cap', 'arrow-up'),
  new ActionSheetOption('Price Descending', 'price_desc', 'Price', 'arrow-down'),
  new ActionSheetOption('Price Ascending', 'price_asc', 'Price', 'arrow-up'),
  new ActionSheetOption(
    'Price Change 24h Descending',
    'h24_change_desc',
    'Price Change 24h',
    'arrow-down'
  ),
  new ActionSheetOption(
    'Price Change 24h Ascending',
    'h24_change_asc',
    'Price Change 24h',
    'arrow-up'
  ),
  new ActionSheetOption('Volume Descending', 'volume_desc', 'Volume', 'arrow-down'),
  new ActionSheetOption('Volume Ascending', 'volume_asc', 'Volume', 'arrow-up'),
  new ActionSheetOption('Cancel'),
];

export const timeIntervalOptions = [
  new ActionSheetOption('1 hour', '1h', '% 1h'),
  new ActionSheetOption('24 hours', '24h', '% 24h'),
  new ActionSheetOption('7 days', '7d', '% 7d'),
  new ActionSheetOption('Cancel'),
];

export const listLimitOptions = [
  new ActionSheetOption('Full List', true, 'Full List'),
  new ActionSheetOption('Top 100', false, 'Top 100'),
  new ActionSheetOption('Cancel'),
];

export const categoryOptions = [
  new ActionSheetOption('All Categories', null, 'All Categories'),
  new ActionSheetOption('Decentralized Finance (DeFi)', 'decentralized_finance_defi', 'DeFi'),
  new ActionSheetOption('Stablecoins', 'stablecoins', 'Stablecoins'),
  new ActionSheetOption('NFT Tokens', '69', 'NFT Tokens'),
  new ActionSheetOption('Automated Market Maker (AMM)', '70', 'AMM'),
  new ActionSheetOption('Decentralized Exchange Token (DEX)', '9', 'DEX'),
  new ActionSheetOption('Exchange-based Tokens (EBT)', '39', 'EBT'),
  new ActionSheetOption('Centralized Exchange Token (CEX)', '93', 'CEX'),
  new ActionSheetOption('Polkadot Ecosystem', '63', 'Polkadot Eco'),
  new ActionSheetOption('Binance Smart Chain Ecosystem', '71', 'Binance Eco'),
  new ActionSheetOption('Solana Ecosystem', '97', 'Solana Eco'),
  new ActionSheetOption('Yield Farming Coins', '65', 'Yield Farming'),
  new ActionSheetOption('Cancel'),
];
