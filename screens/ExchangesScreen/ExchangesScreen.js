import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getExchanges, getExchangesNextPage, getBtcExchangeRates } from '../../redux/actions';
import { convertBtcToCurrency, shouldUpdate } from '../../utils';
import { sharedStyles } from '../../styles';

import ErrorMessage from '../../components/ErrorMessage';
import AppButton from '../../components/AppButton';
import Spinner from '../../components/Spinner';
import ExchangeStatsCard, { exchangeStatsCardHeight } from '../../components/ExchangeStatsCard';
import ListItemSeparator from '../../components/ListItemSeparator';

const ExchangesScreen = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { exchanges, status } = useSelector((state) => state.exchanges);
  const { btcExchangeRates, status: exchangeRatesStatus } = useSelector(
    (state) => state.btcExchangeRates
  );
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const dispatch = useDispatch();

  const loadExchanges = useCallback(() => {
    dispatch(getExchanges());

    const shouldUpdateExchangeRates = shouldUpdate(btcExchangeRates?.lastUpdated, 1000 * 60 * 5);
    if (!btcExchangeRates || shouldUpdateExchangeRates) {
      dispatch(getBtcExchangeRates());
    }
  }, [dispatch, btcExchangeRates]);

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

  const { navigate } = navigation;
  const handleExchangePress = useCallback(
    (id, name, iconUrl) => {
      navigate('Exchange', { screen: 'Exchange Overview', params: { id, name, iconUrl } });
    },
    [navigate]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const { id, name, trust_score_rank, image, trade_volume_24h_btc } = item;

      const tradeVolume = convertBtcToCurrency(
        trade_volume_24h_btc,
        btcExchangeRates?.[referenceCurrency]?.value
      );

      return (
        <ExchangeStatsCard
          id={id}
          name={name}
          rank={trust_score_rank}
          iconUrl={image}
          tradeVolume={tradeVolume ?? trade_volume_24h_btc}
          referenceCurrency={tradeVolume || tradeVolume === 0 ? referenceCurrency : 'btc'}
          onPress={() => handleExchangePress(id, name, image)}
        />
      );
    },
    [btcExchangeRates, referenceCurrency, handleExchangePress]
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

  if (!exchanges) return null;

  return (
    <View style={sharedStyles.screenContainer}>
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
          style={sharedStyles.loadMoreButton}
          stretch
        />
      )}
    </View>
  );
};

export default ExchangesScreen;
