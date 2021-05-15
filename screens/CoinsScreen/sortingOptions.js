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

export const priceChangeIntervalOptions = [
  new ActionSheetOption('1 hour', '1h', '% 1h'),
  new ActionSheetOption('24 hours', '24h', '% 24h'),
  new ActionSheetOption('7 days', '7d', '% 7d'),
  new ActionSheetOption('Cancel'),
];

export const categoryOptions = [
  new ActionSheetOption('All Categories', null, 'All Categories'),
  new ActionSheetOption('Decentralized Finance (DeFi)', 'decentralized-finance-defi', 'DeFi'),
  new ActionSheetOption('Stablecoins', 'stablecoins', 'Stablecoins'),
  new ActionSheetOption('NFT Tokens', 'non-fungible-tokens-nft', 'NFT Tokens'),
  new ActionSheetOption('Automated Market Maker (AMM)', 'automated-market-maker-amm', 'AMM'),
  new ActionSheetOption('Decentralized Exchange Token (DEX)', 'decentralized-exchange', 'DEX'),
  new ActionSheetOption('Exchange-based Tokens (EBT)', 'exchange-based-tokens', 'EBT'),
  new ActionSheetOption(
    'Centralized Exchange Token (CEX)',
    'centralized-exchange-token-cex',
    'CEX'
  ),
  new ActionSheetOption('Polkadot Ecosystem', 'dot-ecosystem', 'Polkadot Ecosystem'),
  new ActionSheetOption(
    'Binance Smart Chain Ecosystem',
    'binance-smart-chain',
    'Binance Ecosystem'
  ),
  new ActionSheetOption('Solana Ecosystem', 'solana-ecosystem', 'Solana Ecosystem'),
  new ActionSheetOption('Yield Farming Coins', 'yield-farming', 'Yield Farming'),
  new ActionSheetOption('Cancel'),
];
