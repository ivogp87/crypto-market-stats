import React, { useEffect, useState, useCallback } from 'react';
import { View, Button, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCoinList, getCoinListNextPage } from '../../redux/actions';
import styles from './styles';
import { useColors } from '../../hooks';

import AppText from '../../components/AppText';
import CoinStatsCard, { coinStatsCardHeight } from '../../components/CoinStatsCard';
import ListItemSeparator from '../../components/ListItemSeparator';

const CoinListScreen = () => {
  const dispatch = useDispatch();
  const { status, coinList } = useSelector((state) => state.coinList);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const referenceCurrency = 'usd';
  const { textPrimary, info } = useColors();

  const loadCoinList = useCallback(() => {
    dispatch(getCoinList(referenceCurrency, 'market_cap_desc'));
  }, [dispatch, referenceCurrency]);

  useEffect(() => {
    loadCoinList();
  }, [loadCoinList]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadCoinList();
  }, [loadCoinList]);

  useEffect(() => {
    if (isRefreshing && status !== 'loading') setIsRefreshing(false);
  }, [isRefreshing, status]);

  const handleLoadMore = useCallback(() => {
    if (status !== 'loading') {
      dispatch(
        getCoinListNextPage(referenceCurrency, 'market_cap_desc', coinList.length / 100 + 1)
      );
    }
  }, [dispatch, referenceCurrency, coinList, status]);

  const handlePress = useCallback(() => {}, []);

  const handleFavorite = useCallback(() => {}, []);

  const keyExtractor = useCallback((item, index) => item.id + index, []);

  const renderItem = useCallback(
    ({ item }) => {
      const {
        id,
        name,
        symbol,
        market_cap_rank,
        image,
        current_price,
        price_change_percentage_24h_in_currency,
        market_cap,
        sparkline_in_7d,
      } = item;

      const sparkline24h = sparkline_in_7d.price
        .slice(-24)
        .filter((_price, index, array) => index % 2 === 0 || index === array.length - 1);

      return (
        <CoinStatsCard
          id={id}
          onPress={() => {
            handlePress(id);
          }}
          onFavorite={() => {
            handleFavorite(id);
          }}
          name={name}
          symbol={symbol}
          rank={market_cap_rank}
          iconUrl={image}
          price={current_price}
          priceChangePercent={price_change_percentage_24h_in_currency}
          marketCap={market_cap}
          sparklineData={sparkline24h}
          referenceCurrency={referenceCurrency}
          isFavorite={false}
        />
      );
    },
    [referenceCurrency, handleFavorite, handlePress]
  );

  const getItemLayout = useCallback(
    (data, index) => ({
      length: coinStatsCardHeight,
      offset: coinStatsCardHeight * index + index * 1,
      index,
    }),
    []
  );

  if (status === 'error') {
    return (
      <View style={styles.container}>
        <AppText color="danger">An error has occurred.</AppText>
        <Button onPress={loadCoinList} color={info} title="Retry" />
      </View>
    );
  }

  if (status === 'loading' && !coinList) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={textPrimary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReachedThreshold={1}
        onEndReached={handleLoadMore}
        keyExtractor={keyExtractor}
        data={coinList}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={() => {
          if (coinList?.length > 0 && status === 'loading') {
            return <ActivityIndicator color={textPrimary} />;
          }
          return null;
        }}
        windowSize={7}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
      />
    </View>
  );
};

export default CoinListScreen;
