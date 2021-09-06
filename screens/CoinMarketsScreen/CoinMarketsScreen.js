import React, { useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getBtcExchangeRates, getCoinMarkets } from '../../redux/actions';
import { shouldUpdate } from '../../utils';
import { sharedStyles } from '../../styles';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import AppButton from '../../components/AppButton';
import MarketPairCard, { marketPairCardHeight } from '../../components/MarketPairCard';
import ListItemSeparator from '../../components/ListItemSeparator';

const CoinMarketsScreen = ({ route }) => {
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const {
    btcExchangeRates,
    status: exchangeRatesStatus,
    lastUpdated: lastExchangeRateUpdate,
  } = useSelector((state) => state.btcExchangeRates);
  const { coinMarkets, status: coinMarketsStatus } = useSelector((state) => state.coinMarkets);

  const coinId = route?.params.coinId;
  const coinMarketData = coinMarkets[coinId];
  const dispatch = useDispatch();

  const getData = useCallback(() => {
    dispatch(getBtcExchangeRates());
    dispatch(getCoinMarkets(coinId));
  }, [dispatch, coinId]);

  const btcExchangeRate = btcExchangeRates?.[referenceCurrency]?.value;
  useEffect(() => {
    const updateInterval = 1000 * 60 * 5;
    const shouldUpdateExchangeRates = shouldUpdate(lastExchangeRateUpdate, updateInterval);

    if (!btcExchangeRate || shouldUpdateExchangeRates) {
      dispatch(getBtcExchangeRates());
    }

    const shouldUpdateMarketData = shouldUpdate(coinMarketData?.lastUpdated, updateInterval);
    if (!coinMarketData || shouldUpdateMarketData) {
      dispatch(getCoinMarkets(coinId));
    }
  }, [dispatch, coinId, coinMarketData, btcExchangeRate, lastExchangeRateUpdate]);

  const keyExtractor = useCallback(
    ({ base, target, market }, index) => base + target + market.identifier + index,
    []
  );

  const renderMarketPairCard = useCallback(
    ({ item }) => {
      const { base, target, market, converted_last, converted_volume, trust_score } = item;
      const { name, identifier, logo } = market;

      const priceInBtc = converted_last.btc;
      const volumeInBtc = converted_volume.btc;

      const priceInCurrency = btcExchangeRate ? priceInBtc * btcExchangeRate : priceInBtc;
      const volumeInCurrency = btcExchangeRate ? volumeInBtc * btcExchangeRate : volumeInBtc;

      return (
        <MarketPairCard
          id={identifier}
          name={name}
          logoUrl={logo}
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
    [referenceCurrency, btcExchangeRate]
  );

  const getItemLayout = useCallback(
    (_data, index) => ({
      length: marketPairCardHeight,
      offset: marketPairCardHeight * index + index * 1,
      index,
    }),
    []
  );

  if (coinMarketsStatus === 'loading' || exchangeRatesStatus === 'loading') {
    return <Spinner size="large" stretch />;
  }

  if (coinMarketsStatus === 'error' || exchangeRatesStatus === 'error') {
    return (
      <ErrorMessage message="An error has occurred." stretch>
        <AppButton title="Retry" onPress={getData} stretch />
      </ErrorMessage>
    );
  }

  if (!coinMarketData || !btcExchangeRates) return null;

  const coinTickers = coinMarketData.tickers;

  return (
    <View style={sharedStyles.screenContainer}>
      <FlatList
        keyExtractor={keyExtractor}
        data={coinTickers}
        renderItem={renderMarketPairCard}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={ListItemSeparator}
        windowSize={7}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
      />
    </View>
  );
};

export default CoinMarketsScreen;
