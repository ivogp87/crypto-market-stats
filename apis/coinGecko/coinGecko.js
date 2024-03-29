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

export const fetchExchanges = (page = 1, resultsPerPage = 100) =>
  coinGecko.get(`/exchanges?page=${page}&per_page=${resultsPerPage}`);

export const fetchBtcExchangeRates = () => coinGecko.get('/exchange_rates');

export const fetchCoinChart = (coinId, referenceCurrency, timeInterval) =>
  coinGecko.get(
    `/coins/${coinId}/market_chart?vs_currency=${referenceCurrency}&days=${timeInterval}`
  );

export const fetchCandlestickChart = (coinId, referenceCurrency, timeInterval) =>
  coinGecko.get(`/coins/${coinId}/ohlc?vs_currency=${referenceCurrency}&days=${timeInterval}`);

export const fetchCoinDetails = (
  coinId,
  marketData = true,
  localization = false,
  tickers = false,
  communityData = false,
  developerData = false,
  sparkline = false
) =>
  coinGecko.get(
    `coins/${coinId}?localization=${localization}&tickers=${tickers}&market_data=${marketData}&community_data=${communityData}&developer_data=${developerData}&sparkline=${sparkline}`
  );

export const fetchCoinMarkets = (
  coinId,
  page = 1,
  order = 'trust_score_desc',
  includeExchangeLogo = true
) =>
  coinGecko.get(
    `/coins/${coinId}/tickers?include_exchange_logo=${includeExchangeLogo}&page=${page}&${order}=trust_score_desc`
  );

export const fetchExchangeChart = (exchangeId, timeInterval) =>
  coinGecko.get(`/exchanges/${exchangeId}/volume_chart?days=${timeInterval}`);

export const fetchExchangeDetails = (exchangeId) => coinGecko.get(`/exchanges/${exchangeId}`);

export const fetchExchangeMarkets = (exchangeId, page) =>
  coinGecko.get(`exchanges/${exchangeId}/tickers?page=${page}`);

export const fetchTrendingSearches = () => coinGecko.get('search/trending');

export const fetchSearchResults = (searchQuery) => coinGecko.get(`search?query=${searchQuery}`);

export const fetchSupportedCurrencies = () => coinGecko.get('simple/supported_vs_currencies');
