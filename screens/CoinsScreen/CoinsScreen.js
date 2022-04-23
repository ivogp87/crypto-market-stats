import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  getCoins,
  getCoinsNextPage,
  setSortingOption,
  toggleFavoriteCoin,
  getFavoriteCoins,
} from '../../redux/actions';

import styles from './styles';
import { orderByOptions, priceChangeIntervalOptions, categoryOptions } from './sortingOptions';

import { useTheme, useStyles } from '../../hooks';
import { actionSheetThemedStyles, sharedStyles } from '../../styles';

import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import AppButton from '../../components/AppButton';
import ButtonGroup from '../../components/ButtonGroup';
import AppText from '../../components/AppText';
import CoinStatsCard, { coinStatsCardHeight } from '../../components/CoinStatsCard';
import ListItemSeparator from '../../components/ListItemSeparator';

const CoinsScreen = ({ navigation, route }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const displayFavoriteCoins = route?.params?.displayFavoriteCoins; // boolean - display either all coins or favorite coins list
  const { status, coins } = useSelector((state) => state.coins);
  const { status: favoriteCoinsStatus, favoriteCoins } = useSelector(
    (state) => state.favoriteCoins
  );
  const favoriteCoinIds = useSelector((state) => state.settings.favoriteCoinIds);
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const { category, orderBy, priceChangeInterval } = useSelector(
    (state) => state.settings.sortingOptions
  );
  const showSparkline = useSelector((state) => state.settings.showSparkline);

  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const themeName = useTheme().name;
  const windowHeight = useWindowDimensions().height;
  const actionSheetStyles = useStyles(actionSheetThemedStyles, themeName, windowHeight);

  const loadCoins = useCallback(() => {
    dispatch(getCoins(referenceCurrency, orderBy, 1, showSparkline, category));
  }, [dispatch, referenceCurrency, orderBy, showSparkline, category]);

  const loadFavoriteCoins = useCallback(() => {
    if (favoriteCoinIds.length) {
      dispatch(getFavoriteCoins(favoriteCoinIds, referenceCurrency, orderBy, showSparkline));
    }
  }, [dispatch, favoriteCoinIds, referenceCurrency, orderBy, showSparkline]);

  const loadCoinsData = displayFavoriteCoins ? loadFavoriteCoins : loadCoins;

  useEffect(() => {
    loadCoinsData();
  }, [loadCoinsData]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadCoinsData();
  }, [loadCoinsData]);

  const isLoading =
    (status === 'loading' && !displayFavoriteCoins) ||
    (favoriteCoinsStatus === 'loading' && displayFavoriteCoins);

  useEffect(() => {
    if (isRefreshing && !isLoading) setIsRefreshing(false);
  }, [isRefreshing, isLoading]);

  const loadCoinsNextPage = useCallback(() => {
    if (!status.includes('loading') && !displayFavoriteCoins) {
      const page = Math.ceil(coins.length / 100 + 1);
      dispatch(getCoinsNextPage(referenceCurrency, orderBy, page, showSparkline, category));
    }
  }, [
    dispatch,
    referenceCurrency,
    coins,
    status,
    orderBy,
    showSparkline,
    category,
    displayFavoriteCoins,
  ]);

  const { navigate } = navigation;
  const handleCoinPress = useCallback(
    (id, name, symbol, iconUrl) => {
      navigate('Coin', { screen: 'Coin Overview', params: { id, name, symbol, iconUrl } });
    },
    [navigate]
  );

  const handleFavorite = useCallback(
    (coinId) => {
      dispatch(toggleFavoriteCoin(coinId));
    },
    [dispatch]
  );

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

      if (priceChangeInterval === '1h') {
        priceChangePercent = price_change_percentage_1h_in_currency;
      }

      if (priceChangeInterval === '24h' && sparkline_in_7d?.price && sparkline_in_7d.price.length) {
        // sparkline_in_7d.price is array of numbers with 168 items - prices for 7 days for each hour.
        // for the 24 hour chart we need the last 24 items. The goal of the additional filtering is to reduce
        // the size of the array since rendering charts with a lot of data points inside FlatList slows down the app.
        sparklineData = sparkline_in_7d.price
          .slice(-24)
          .filter((_price, index, array) => index % 2 === 0 || index === array.length - 1);
      }

      if (priceChangeInterval === '7d') {
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
            handleCoinPress(id, name, symbol, image);
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
          isFavorite={favoriteCoinIds.includes(id)}
        />
      );
    },
    [
      referenceCurrency,
      handleFavorite,
      handleCoinPress,
      showSparkline,
      priceChangeInterval,
      favoriteCoinIds,
    ]
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

  const handlePriceChangeIntervalPress = () => {
    const cancelButton = priceChangeIntervalOptions.length - 1;
    showActionSheetWithOptions(
      {
        options: priceChangeIntervalOptions.map(({ option }) => option),
        cancelButtonIndex: cancelButton,
        title: 'Set Price Change Interval',
        ...actionSheetStyles,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButton) {
          const optionValues = priceChangeIntervalOptions.map(({ value }) => value);
          dispatch(setSortingOption('priceChangeInterval', optionValues[buttonIndex]));
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

  const { buttonTitle: orderByBtnTitle, buttonIcon: orderByBtnIcon } = orderByOptions.find(
    ({ value }) => value === orderBy
  );
  const { buttonTitle: priceChangeIntervalBtnTitle } = priceChangeIntervalOptions.find(
    ({ value }) => value === priceChangeInterval
  );
  const { buttonTitle: categoryBtnTitle } = categoryOptions.find(({ value }) => value === category);

  if (
    (status === 'error' && !displayFavoriteCoins) ||
    (favoriteCoinsStatus === 'error' && displayFavoriteCoins)
  ) {
    return (
      <ErrorMessage message="An error has occurred." stretch>
        <AppButton title="Retry" onPress={loadCoinsData} stretch />
      </ErrorMessage>
    );
  }

  if (
    (status === 'loading' && !coins) ||
    (favoriteCoinsStatus === 'loading' && !favoriteCoins && displayFavoriteCoins)
  ) {
    return <Spinner size="large" stretch />;
  }

  if (displayFavoriteCoins && favoriteCoinIds.length === 0) {
    return (
      <View style={styles.emptyFavoritesList}>
        <AppText>You don&apos;t have any favorite cryptoccurencies yet.</AppText>
      </View>
    );
  }

  return (
    <View style={sharedStyles.screenContainer}>
      <ButtonGroup style={styles.buttonGroup}>
        <ButtonGroup.Item
          onPress={handleOrderByPress}
          title={orderByBtnTitle}
          iconRight={orderByBtnIcon}
          rounded
        />
        <ButtonGroup.Item
          onPress={handlePriceChangeIntervalPress}
          title={priceChangeIntervalBtnTitle}
          rounded
        />
        {!displayFavoriteCoins && (
          <ButtonGroup.Item onPress={handleCategoryPress} title={categoryBtnTitle} rounded />
        )}
      </ButtonGroup>
      <FlatList
        style={styles.coins}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReachedThreshold={1}
        onEndReached={loadCoinsNextPage}
        keyExtractor={keyExtractor}
        data={displayFavoriteCoins ? favoriteCoins : coins}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={() => (status === 'loading next page' ? <Spinner /> : null)}
        windowSize={7}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
      />
      {!isRefreshing && isLoading && <Spinner size="large" stretch />}
      {status === 'error loading next page' && (
        <AppButton
          title="Load More"
          onPress={loadCoinsNextPage}
          style={styles.loadMoreButton}
          stretch
        />
      )}
    </View>
  );
};

CoinsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      displayFavoriteCoins: PropTypes.bool,
    }),
  }).isRequired,
};

export default CoinsScreen;
