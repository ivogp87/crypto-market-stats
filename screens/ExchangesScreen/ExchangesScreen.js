import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';
import { getExchanges, getExchangesNextPage, getBtcExchangeRates } from '../../redux/actions';

import ErrorMessage from '../../components/ErrorMessage';
import AppButton from '../../components/AppButton';
import Spinner from '../../components/Spinner';
import ExchangeStatsCard, { exchangeStatsCardHeight } from '../../components/ExchangeStatsCard';
import ListItemSeparator from '../../components/ListItemSeparator';

const ExchangesScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { exchanges, status } = useSelector((state) => state.exchanges);
  const { btcExchangeRates, status: exchangeRatesStatus } = useSelector(
    (state) => state.btcExchangeRates
  );
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const dispatch = useDispatch();

  const loadExchanges = useCallback(() => {
    dispatch(getExchanges());
    // The API returns exchanges trading volume in BTC. Fetch the BTC exchange rates in order to
    // convert the trading volume to the referenceCurrency set by the user (state.settings.referenceCurrency)
    dispatch(getBtcExchangeRates());
  }, [dispatch]);

  useEffect(() => {
    loadExchanges();
  }, [loadExchanges]);

  const loadExchangesNextPage = useCallback(() => {
    if (!status.includes('loading')) {
      const page = Math.ceil(exchanges.length / 100 + 1);
      dispatch(getExchangesNextPage(page));
    }
  }, [status, exchanges, dispatch]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadExchanges();
  }, [loadExchanges]);

  useEffect(() => {
    if (status !== 'loading' && exchangeRatesStatus !== 'loading') {
      setIsRefreshing(false);
    }
  }, [status, exchangeRatesStatus]);

  // eslint-disable-next-line no-unused-vars
  const handleExchangePress = (exchangeId) => {};

  const renderItem = useCallback(
    ({ item }) => {
      const { id, name, trust_score_rank, image, trade_volume_24h_btc } = item;

      // convert trade_volume_24h_btc to the referenceCurrency set by the user (state.settings.referenceCurrency)
      const btcExchangeRate = btcExchangeRates?.[referenceCurrency]?.value;
      const tradeVolume = btcExchangeRate
        ? trade_volume_24h_btc * btcExchangeRate
        : trade_volume_24h_btc;

      return (
        <ExchangeStatsCard
          id={id}
          name={name}
          rank={trust_score_rank}
          iconUrl={image}
          tradeVolume={tradeVolume}
          referenceCurrency={btcExchangeRate ? referenceCurrency : 'btc'}
          onPress={() => handleExchangePress(id)}
        />
      );
    },
    [btcExchangeRates, referenceCurrency]
  );

  const keyExtractor = useCallback((item, index) => item.id + index, []);

  const getItemLayout = useCallback(
    (_data, index) => ({
      length: exchangeStatsCardHeight,
      offset: exchangeStatsCardHeight * index + index * 1,
      index,
    }),
    []
  );

  if (status === 'error') {
    return (
      <ErrorMessage message="An error has occurred." stretch>
        <AppButton title="Retry" onPress={loadExchanges} stretch />
      </ErrorMessage>
    );
  }

  if (status === 'loading' && exchangeRatesStatus === 'loading' && !exchanges)
    return <Spinner size="large" stretch />;

  return (
    <View style={styles.container}>
      <FlatList
        data={exchanges}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
        getItemLayout={getItemLayout}
        onEndReachedThreshold={1}
        onEndReached={loadExchangesNextPage}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() => (status === 'loading next page' ? <Spinner /> : null)}
        initialNumToRender={15}
      />
      {status === 'error loading next page' && (
        <AppButton
          title="Load More"
          onPress={loadExchangesNextPage}
          style={styles.loadMoreButton}
          stretch
        />
      )}
    </View>
  );
};

export default ExchangesScreen;
