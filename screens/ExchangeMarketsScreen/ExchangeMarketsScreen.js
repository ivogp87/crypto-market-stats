import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getBtcExchangeRates, getExchangeDetails, getExchangeMarkets } from '../../redux/actions';

import { shouldUpdate } from '../../utils';
import { sharedStyles } from '../../styles';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import AppButton from '../../components/AppButton';
import MarketPairCard, { marketPairCardHeight } from '../../components/MarketPairCard';
import ListItemSeparator from '../../components/ListItemSeparator';

const ExchangeMarketsScreen = ({ route }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const exchangeId = route?.params.exchangeId;

  const exchangeMarkets = useSelector(
    (state) => state.exchangeDetails.exchangeDetails[exchangeId]?.tickers
  );
  const exchangeMarketsLastUpdated = useSelector(
    (state) => state.exchangeDetails.exchangeDetails[exchangeId]?.lastUpdated
  );
  const exchangeMarketsStatus = useSelector((state) => state.exchangeDetails.status);
  const exchangeLogo = useSelector(
    (state) => state.exchangeDetails.exchangeDetails[exchangeId]?.image
  );
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const {
    btcExchangeRates,
    status: exchangeRatesStatus,
    lastUpdated: lastExchangeRateUpdate,
  } = useSelector((state) => state.btcExchangeRates);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const btcExchangeRate = btcExchangeRates?.[referenceCurrency]?.value;

  const getExchangeMarketsData = useCallback(() => {
    const updateInterval = 1000 * 60 * 5;
    const shouldUpdateData = shouldUpdate(exchangeMarketsLastUpdated, updateInterval);
    const shouldUpdateExchangeRates = shouldUpdate(lastExchangeRateUpdate, updateInterval);

    if (exchangeMarketsStatus !== 'loading') {
      if (!exchangeMarkets || shouldUpdateData) {
        dispatch(getExchangeDetails(exchangeId));
      }
    }

    if (shouldUpdateExchangeRates || !btcExchangeRate) {
      dispatch(getBtcExchangeRates());
    }
  }, [
    dispatch,
    exchangeId,
    exchangeMarkets,
    exchangeMarketsLastUpdated,
    btcExchangeRate,
    lastExchangeRateUpdate,
    exchangeMarketsStatus,
  ]);

  const setScrollingStarted = () => {
    if (!hasScrolled) {
      setHasScrolled(true);
    }
  };

  useEffect(() => () => setHasScrolled(false), []);

  const getExchangeMarketPairs = useCallback(() => {
    if (exchangeMarketsStatus !== 'loading' && hasScrolled) {
      const page = Math.ceil(exchangeMarkets?.length / 100 + 1);
      dispatch(getExchangeMarkets(exchangeId, page));
    }
  }, [dispatch, exchangeId, exchangeMarketsStatus, exchangeMarkets?.length, hasScrolled]);

  useEffect(() => {
    getExchangeMarketsData();
  }, [getExchangeMarketsData]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    getExchangeMarketsData();
  }, [getExchangeMarketsData]);

  useEffect(() => {
    if (isRefreshing && exchangeMarketsStatus !== 'loading') {
      setIsRefreshing(false);
    }
  }, [isRefreshing, exchangeMarketsStatus]);

  const keyExtractor = useCallback(
    ({ base, target, volume }, index) => base + target + volume + index,
    []
  );

  const renderMarketPairCard = useCallback(
    ({ item }) => {
      const { base, target, market, converted_last, converted_volume, trust_score } = item;
      const { name, identifier } = market;

      const priceInBtc = converted_last.btc;
      const volumeInBtc = converted_volume.btc;

      const priceInCurrency = btcExchangeRate ? priceInBtc * btcExchangeRate : priceInBtc; // use util
      const volumeInCurrency = btcExchangeRate ? volumeInBtc * btcExchangeRate : volumeInBtc; // use util

      return (
        <MarketPairCard
          id={identifier}
          name={name}
          logoUrl={exchangeLogo}
          baseCurrency={base}
          targetCurrency={target}
          priceInCurrency={priceInCurrency}
          priceInBtc={priceInBtc}
          referenceCurrency={referenceCurrency}
          volumeInCurrency={volumeInCurrency}
          volumeInBtc={volumeInBtc}
          trustScore={trust_score}
        />
      );
    },
    [referenceCurrency, btcExchangeRate, exchangeLogo]
  );

  const getItemLayout = useCallback(
    (_data, index) => ({
      length: marketPairCardHeight,
      offset: marketPairCardHeight * index + index * 1,
      index,
    }),
    []
  );

  if (
    (exchangeMarketsStatus === 'loading' && !exchangeMarkets?.length) ||
    exchangeRatesStatus === 'loading'
  ) {
    return <Spinner size="large" stretch />;
  }

  if (exchangeMarketsStatus === 'error' || exchangeRatesStatus === 'error') {
    return (
      <ErrorMessage message="An error has occurred." stretch>
        <AppButton title="Retry" onPress={getExchangeMarketsData} stretch />
      </ErrorMessage>
    );
  }

  if (!exchangeMarkets?.length || !btcExchangeRates) return null;

  return (
    <View style={sharedStyles.screenContainer}>
      <FlatList
        keyExtractor={keyExtractor}
        data={exchangeMarkets}
        renderItem={renderMarketPairCard}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={ListItemSeparator}
        windowSize={7}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.7}
        onEndReached={getExchangeMarketPairs}
        onMomentumScrollBegin={setScrollingStarted}
        ListFooterComponent={() =>
          exchangeMarketsStatus === 'loading' && exchangeMarkets?.length ? <Spinner /> : null
        }
      />
    </View>
  );
};

export default ExchangeMarketsScreen;
