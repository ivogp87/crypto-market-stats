import React, { useEffect } from 'react';
import { ScrollView, useWindowDimensions, Platform, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { actionSheetThemedStyles, sharedStyles } from '../../styles';
import { useTheme, useStyles } from '../../hooks';
import { getLineChartData, getCandlestickChartData, shouldUpdate } from '../../utils';

import {
  getCoinChart,
  getCandlestickChart,
  getCoinDetails,
  setCoinChartInterval,
  setCoinChartType,
  setChartVariant,
} from '../../redux/actions';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import AppButton from '../../components/AppButton';
import CoinPrice from '../../components/CoinPrice';
import Chart from '../../components/Chart';
import ButtonGroup from '../../components/ButtonGroup';
import CoinInfo from '../../components/CoinInfo';
import CoinPriceChange from '../../components/CoinPriceChange';
import CandlestickChart from '../../components/CandlestickChart';

const CoinOverviewScreen = ({ route }) => {
  const coinId = route?.params?.id;
  const coinDetails = useSelector((state) => state.coinDetails.coinDetails[coinId]);
  const coinDetailsStatus = useSelector((state) => state.coinDetails.status);
  const { lineChart, candlestickChart, status: coinChartStatus } = useSelector(
    (state) => state.coinChart
  );
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const { timeInterval, chartType, chartVariant } = useSelector(
    (state) => state.settings.coinChartSettings
  );
  const dispatch = useDispatch();

  const handleChartVariantChange = () => {
    if (chartVariant === 'line chart') {
      dispatch(setChartVariant('candlestick chart'));
    } else {
      dispatch(setChartVariant('line chart'));
    }
  };

  const shouldRefreshData = shouldUpdate(coinDetails?.lastUpdated, 1000 * 60 * 5);

  useEffect(() => {
    if (!coinDetails || shouldRefreshData) {
      dispatch(getCoinDetails(coinId));
    }
  }, [dispatch, coinId, coinDetails, shouldRefreshData]);

  useEffect(() => {
    if (chartVariant === 'line chart') {
      dispatch(getCoinChart(coinId, referenceCurrency, timeInterval));
    } else {
      dispatch(getCandlestickChart(coinId, referenceCurrency, timeInterval));
    }
  }, [dispatch, coinId, referenceCurrency, timeInterval, chartVariant]);

  const handleTimeIntervalChange = (interval) => {
    dispatch(setCoinChartInterval(interval));
  };

  const getButtonColor = (interval) => (interval === timeInterval ? 'info' : 'primary');

  const { showActionSheetWithOptions } = useActionSheet();
  const themeName = useTheme().name;
  const windowHeight = useWindowDimensions().height;
  const actionSheetStyles = useStyles(actionSheetThemedStyles, themeName, windowHeight);

  const handleChartTypeChange = () => {
    const options = ['Price', 'Volume', 'Market Cap', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: 'Change Chart Type',
        ...actionSheetStyles,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButtonIndex) {
          dispatch(setCoinChartType(options[buttonIndex].toLowerCase()));
        }
      }
    );
  };

  const getCoinData = () => {
    dispatch(getCoinDetails(coinId));
    dispatch(getCoinChart(coinId, referenceCurrency, timeInterval));
  };

  if (
    (coinDetailsStatus === 'loading' && !coinDetails) ||
    (coinDetailsStatus === 'idle' && !coinDetails)
  ) {
    return <Spinner size="large" stretch />;
  }

  if (coinDetailsStatus === 'error') {
    return (
      <ErrorMessage message="An error has occurred." stretch>
        <AppButton title="Retry" onPress={getCoinData} stretch />
      </ErrorMessage>
    );
  }

  const lineChartData = getLineChartData(lineChart, chartType);
  const candlestickChartData = getCandlestickChartData(candlestickChart);
  const coinChartLoading = coinChartStatus === 'loading';
  const coinChartError = coinChartStatus === 'error';

  const {
    current_price,
    market_cap,
    market_cap_rank,
    max_supply,
    total_supply,
    circulating_supply,
    total_volume,
    high_24h,
    low_24h,
    ath,
    atl,
  } = coinDetails.market_data;

  const getPriceChangeData = (period) => ({
    period,
    percentChange: coinDetails.market_data[`price_change_percentage_${period.toLowerCase()}`],
    priceChange:
      coinDetails.market_data?.[`price_change_percentage_${period.toLowerCase()}_in_currency`][
        referenceCurrency
      ],
  });
  const priceChangeData = ['24H', '7D', '14D', '30D', '60D', '200D', '1Y'].map((period) =>
    getPriceChangeData(period)
  );

  const chartButtons = [
    { label: '1d', period: 1 },
    { label: '7d', period: 7 },
    { label: '14d', period: 14 },
    { label: '1m', period: 30 },
    { label: '3m', period: 90 },
    { label: '6m', period: 180 },
    { label: '1y', period: 365 },
    { label: 'All', period: 'max' },
  ].map(({ label, period }) => (
    <ButtonGroup.Item
      key={label}
      title={label}
      onPress={() => handleTimeIntervalChange(period)}
      size="small"
      color={getButtonColor(period)}
      rounded
    />
  ));

  const buttonIcon = Platform.OS === 'android' ? 'md-swap-vertical' : 'ios-swap-vertical';

  return (
    <ScrollView
      style={sharedStyles.screenContainer}
      refreshControl={<RefreshControl refreshing={false} onRefresh={getCoinData} />}
    >
      <CoinPrice
        price={current_price[referenceCurrency]}
        priceChangePercentage={coinDetails.market_data.price_change_percentage_24h}
        referenceCurrency={referenceCurrency}
      />
      {(lineChartData || coinChartLoading) && chartVariant === 'line chart' && (
        <Chart data={lineChartData} isLoading={coinChartLoading} error={coinChartError} />
      )}
      {(candlestickChartData || coinChartLoading) && chartVariant === 'candlestick chart' && (
        <CandlestickChart
          data={candlestickChartData}
          isLoading={coinChartLoading}
          error={coinChartError}
        />
      )}
      <ButtonGroup>
        {chartButtons}
        <ButtonGroup.Item
          title="Chart Variant"
          onPress={handleChartVariantChange}
          size="small"
          color="info"
          iconLeft={buttonIcon}
          rounded
          variant="outline"
          textTransform="capitalize"
        />
        <ButtonGroup.Item
          title={chartType}
          onPress={handleChartTypeChange}
          size="small"
          color="info"
          iconLeft={buttonIcon}
          rounded
          variant="outline"
          textTransform="capitalize"
        />
      </ButtonGroup>
      <CoinInfo
        referenceCurrency={referenceCurrency}
        rank={market_cap_rank}
        marketCap={market_cap[referenceCurrency]}
        maxSupply={max_supply}
        totalSupply={total_supply}
        circulatingSupply={circulating_supply}
        tradeVolume={total_volume[referenceCurrency]}
        high={high_24h[referenceCurrency]}
        low={low_24h[referenceCurrency]}
        allTimeHigh={ath[referenceCurrency]}
        allTimeLow={atl[referenceCurrency]}
      />
      <CoinPriceChange data={priceChangeData} referenceCurrency={referenceCurrency} />
    </ScrollView>
  );
};

export default CoinOverviewScreen;
