import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { sharedStyles } from '../../styles';
import {
  getTrendingSearches,
  setSearchQuery,
  getBtcExchangeRates,
  toggleFavoriteCoin,
} from '../../redux/actions';
import { shouldUpdate } from '../../utils';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import ButtonGroup from '../../components/ButtonGroup';
import SearchResults from '../../components/SearchResults';

const SearchScreen = ({ navigation }) => {
  const {
    status: trendingSearchesStatus,
    coins: trendingCoins,
    lastUpdated: trendingSearchesLastUpdated,
  } = useSelector((state) => state.trendingSearches);

  const {
    btcExchangeRates,
    status: exchangeRatesStatus,
    lastUpdated: exchangeRatesLastUpdated,
  } = useSelector((state) => state.btcExchangeRates);

  const { coins, exchanges, status: searchStatus } = useSelector((state) => state.searchResults);

  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const favoriteCoinIds = useSelector((state) => state.settings.favoriteCoinIds);

  const [resultsToShow, setResultsToShow] = useState('All'); // All | Cryptocurrencies | Exchanges

  const dispatch = useDispatch();

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    // clear the search query when unmounting
    return () => {
      dispatch(setSearchQuery(''));
    };
  }, [dispatch]);

  useEffect(() => {
    const updateInterval = 1000 * 60 * 5;
    const shouldUpdateTrendingSearches = shouldUpdate(trendingSearchesLastUpdated, updateInterval);
    const shouldUpdateExchangeRates = shouldUpdate(exchangeRatesLastUpdated, updateInterval);

    if (shouldUpdateTrendingSearches && trendingSearchesStatus === 'idle') {
      dispatch(getTrendingSearches());
    }

    if (shouldUpdateExchangeRates && exchangeRatesStatus === 'idle') {
      dispatch(getBtcExchangeRates());
    }
  }, [
    dispatch,
    trendingSearchesLastUpdated,
    trendingSearchesStatus,
    exchangeRatesLastUpdated,
    exchangeRatesStatus,
  ]);

  const { navigate } = navigation;
  const handleCoinPress = (id, name, iconUrl, symbol) => {
    navigate('Coin', { screen: 'Coin Overview', params: { id, name, iconUrl, symbol } });
  };

  const handleExchangePress = (id, name, iconUrl) => {
    navigate('Exchange', { screen: 'Exchange Overview', params: { id, name, iconUrl } });
  };

  const handleFavorite = (coinId) => {
    dispatch(toggleFavoriteCoin(coinId));
  };

  const buttons = ['All', 'Cryptocurrencies', 'Exchanges'].map((buttonLabel) => (
    <ButtonGroup.Item
      key={buttonLabel}
      title={buttonLabel}
      size="small"
      color={resultsToShow === buttonLabel ? 'info' : 'primary'}
      onPress={() => {
        setResultsToShow(buttonLabel);
      }}
      rounded
    />
  ));

  const showCoinSearchResults = coins?.length > 0 && resultsToShow !== 'Exchanges';
  const showExchangeSearchResults = exchanges?.length > 0 && resultsToShow !== 'Cryptocurrencies';

  if (
    (trendingSearchesStatus === 'loading' && !trendingCoins) ||
    (exchangeRatesStatus === 'loading' && !btcExchangeRates)
  ) {
    return <Spinner size="large" stretch />;
  }

  if (searchStatus === 'error') {
    return <ErrorMessage message="Something went wrong. Please try again." stretch />;
  }

  return (
    <ScrollView style={sharedStyles.screenContainer}>
      {coins?.length > 0 && exchanges?.length > 0 && <ButtonGroup>{buttons}</ButtonGroup>}
      {showCoinSearchResults && (
        <SearchResults
          data={coins}
          title="Cryptocurrencies"
          referenceCurrency={referenceCurrency}
          btcExchangeRate={btcExchangeRates?.[referenceCurrency]?.value}
          favoriteCoinIds={favoriteCoinIds}
          onFavorite={handleFavorite}
          onPress={handleCoinPress}
        />
      )}
      {showExchangeSearchResults && (
        <SearchResults data={exchanges} title="Exchanges" onPress={handleExchangePress} />
      )}
      {btcExchangeRates && trendingCoins.length > 0 && (
        <SearchResults
          data={trendingCoins}
          title="Trending"
          referenceCurrency={referenceCurrency}
          btcExchangeRate={btcExchangeRates?.[referenceCurrency]?.value}
          favoriteCoinIds={favoriteCoinIds}
          onFavorite={handleFavorite}
          onPress={handleCoinPress}
        />
      )}
    </ScrollView>
  );
};

export default SearchScreen;
