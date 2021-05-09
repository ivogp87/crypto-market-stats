import coinGecko from './axiosConfig';

// eslint-disable-next-line import/prefer-default-export
export const fetchCoins = (
  referenceCurrency,
  orderBy,
  page = 1,
  includeSparkline,
  category,
  resultsPerPage = 100,
  priceChangePercentage = '1h,24h,7d'
) =>
  coinGecko.get(
    `/coins/markets?vs_currency=${referenceCurrency}&order=${orderBy}&page=${page}&sparkline=${includeSparkline}${
      category ? `&category=${category}` : ''
    }&per_page=${resultsPerPage}&price_change_percentage=${priceChangePercentage}`
  );
