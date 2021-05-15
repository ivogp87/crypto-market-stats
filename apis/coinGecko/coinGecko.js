import coinGecko from './axiosConfig';

export const fetchCoins = (
  referenceCurrency,
  orderBy,
  page,
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

export const fetchCoinsById = (
  coinIds,
  referenceCurrency,
  orderBy,
  includeSparkline,
  priceChangePercentage = '1h,24h,7d'
) =>
  coinGecko.get(
    `/coins/markets?ids=${coinIds.join()}&vs_currency=${referenceCurrency}&order=${orderBy}&sparkline=${includeSparkline}&price_change_percentage=${priceChangePercentage}`
  );
