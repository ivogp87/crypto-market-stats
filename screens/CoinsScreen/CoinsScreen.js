import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getCoins, getCoinsNextPage, setSortingOption } from '../../redux/actions';

import {
  orderByOptions,
  timeIntervalOptions,
  listLimitOptions,
  categoryOptions,
} from './sortingOptions';

import { useTheme, useStyles } from '../../hooks';
import { actionSheetThemedStyles, screenStyles } from '../../styles';

import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import AppButton from '../../components/AppButton';
import ButtonGroup from '../../components/ButtonGroup';
import CoinStatsCard, { coinStatsCardHeight } from '../../components/CoinStatsCard';
import ListItemSeparator from '../../components/ListItemSeparator';

const CoinsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { status, coins } = useSelector((state) => state.coins);
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const { category, orderBy, timeInterval, showFullList } = useSelector(
    (state) => state.settings.sortingOptions
  );
  const showSparkline = useSelector((state) => state.settings.showSparkline);
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const themeName = useTheme().name;
  const windowHeight = useWindowDimensions().height;
  const actionSheetStyles = useStyles(actionSheetThemedStyles, themeName, windowHeight);

  const { buttonTitle: orderByBtnTitle, buttonIcon: orderByBtnIcon } = orderByOptions.find(
    ({ value }) => value === orderBy
  );
  const { buttonTitle: timeIntervalBtnTitle } = timeIntervalOptions.find(
    ({ value }) => value === timeInterval
  );
  const { buttonTitle: listLimitBtnTitle } = listLimitOptions.find(
    ({ value }) => value === showFullList
  );
  const { buttonTitle: categoryBtnTitle } = categoryOptions.find(({ value }) => value === category);

  const loadCoins = useCallback(() => {
    dispatch(getCoins(referenceCurrency, orderBy, 1, showSparkline, category));
  }, [dispatch, referenceCurrency, orderBy, showSparkline, category]);

  useEffect(() => {
    loadCoins();
  }, [loadCoins]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadCoins();
  }, [loadCoins]);

  useEffect(() => {
    if (isRefreshing && status !== 'loading') setIsRefreshing(false);
  }, [isRefreshing, status]);

  const loadCoinsNextPage = useCallback(() => {
    if (!status.includes('loading') && showFullList) {
      const page = coins.length / 100 + 1;
      dispatch(getCoinsNextPage(referenceCurrency, orderBy, page, showSparkline, category));
    }
  }, [dispatch, referenceCurrency, coins, status, showFullList, orderBy, showSparkline, category]);

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
        price_change_percentage_1h_in_currency,
        price_change_percentage_24h_in_currency,
        price_change_percentage_7d_in_currency,
        market_cap,
        sparkline_in_7d,
      } = item;

      let priceChangePercent = price_change_percentage_24h_in_currency;
      let sparklineData = null;

      if (timeInterval === '1h') {
        priceChangePercent = price_change_percentage_1h_in_currency;
      }

      if (timeInterval === '24h' && sparkline_in_7d?.price && sparkline_in_7d.price.length) {
        // sparkline_in_7d.price is array of numbers with 168 items - prices for 7 days for each hour.
        // for the 24 hour chart we need the last 24 items. The goal of the additional filtering is to reduce
        // the size of the array since rendering charts with a lot of data points inside FlatList slows down the app.
        sparklineData = sparkline_in_7d.price
          .slice(-24)
          .filter((_price, index, array) => index % 2 === 0 || index === array.length - 1);
      }

      if (timeInterval === '7d') {
        priceChangePercent = price_change_percentage_7d_in_currency;

        if (sparkline_in_7d?.price && sparkline_in_7d.price.length) {
          sparklineData = sparkline_in_7d.price.filter(
            (_price, index, array) => index % 12 === 0 || index === array.length - 1
          );
        }
      }

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
          priceChangePercent={priceChangePercent}
          marketCap={market_cap}
          sparklineData={showSparkline ? sparklineData : null}
          referenceCurrency={referenceCurrency}
          isFavorite={false}
        />
      );
    },
    [referenceCurrency, handleFavorite, handlePress, showSparkline, timeInterval]
  );

  const getItemLayout = useCallback(
    (_data, index) => ({
      length: coinStatsCardHeight,
      offset: coinStatsCardHeight * index + index * 1,
      index,
    }),
    []
  );

  const handleOrderByPress = () => {
    const cancelButton = orderByOptions.length - 1;
    showActionSheetWithOptions(
      {
        options: orderByOptions.map(({ option }) => option),
        cancelButtonIndex: cancelButton,
        title: 'Sort By',
        ...actionSheetStyles,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButton) {
          const optionValues = orderByOptions.map(({ value }) => value);
          dispatch(setSortingOption('orderBy', optionValues[buttonIndex]));
        }
      }
    );
  };

  const handleTimeIntervalPress = () => {
    const cancelButton = timeIntervalOptions.length - 1;
    showActionSheetWithOptions(
      {
        options: timeIntervalOptions.map(({ option }) => option),
        cancelButtonIndex: cancelButton,
        title: 'Set Price Change % Time Interval',
        ...actionSheetStyles,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButton) {
          const optionValues = timeIntervalOptions.map(({ value }) => value);
          dispatch(setSortingOption('timeInterval', optionValues[buttonIndex]));
        }
      }
    );
  };

  const handleListLimitPress = () => {
    const cancelButton = listLimitOptions.length - 1;
    showActionSheetWithOptions(
      {
        options: listLimitOptions.map(({ option }) => option),
        cancelButtonIndex: cancelButton,
        title: 'Change List Limit',
        ...actionSheetStyles,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButton) {
          const optionValues = listLimitOptions.map(({ value }) => value);
          dispatch(setSortingOption('showFullList', optionValues[buttonIndex]));
        }
      }
    );
  };

  const handleCategoryPress = () => {
    const cancelButton = categoryOptions.length - 1;
    showActionSheetWithOptions(
      {
        options: categoryOptions.map(({ option }) => option),
        cancelButtonIndex: cancelButton,
        title: 'Select Category',
        ...actionSheetStyles,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButton) {
          const optionValues = categoryOptions.map(({ value }) => value);
          dispatch(setSortingOption('category', optionValues[buttonIndex]));
        }
      }
    );
  };

  if (status === 'error') {
    return (
      <ErrorMessage message="An error has occurred." stretch>
        <AppButton title="Retry" onPress={loadCoins} stretch />
      </ErrorMessage>
    );
  }

  if (status === 'loading' && !coins) {
    return <Spinner size="large" stretch />;
  }

  return (
    <View style={screenStyles.container}>
      <ButtonGroup style={screenStyles.marginBottom}>
        <ButtonGroup.Item
          onPress={handleOrderByPress}
          title={orderByBtnTitle}
          iconRight={orderByBtnIcon}
          rounded
        />
        <ButtonGroup.Item onPress={handleTimeIntervalPress} title={timeIntervalBtnTitle} rounded />
        <ButtonGroup.Item onPress={handleListLimitPress} title={listLimitBtnTitle} rounded />
        <ButtonGroup.Item onPress={handleCategoryPress} title={categoryBtnTitle} rounded />
      </ButtonGroup>
      <FlatList
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReachedThreshold={1}
        onEndReached={loadCoinsNextPage}
        keyExtractor={keyExtractor}
        data={coins}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={() => (status === 'loading next page' ? <Spinner /> : null)}
        windowSize={7}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
      />
      {status === 'loading' && !isRefreshing && <Spinner size="large" stretch />}
      {status === 'error loading next page' && (
        <AppButton
          title="Load More"
          onPress={loadCoinsNextPage}
          style={[screenStyles.marginHorizontal, screenStyles.marginTop]}
          stretch
        />
      )}
    </View>
  );
};

export default CoinsScreen;
