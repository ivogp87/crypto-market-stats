import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';

import { sharedStyles } from '../../styles';
import {
  getBtcExchangeRates,
  getExchangeVolumeChart,
  setCoinChartInterval,
  getExchangeDetails,
} from '../../redux/actions';
import { convertBtcToCurrency, shouldUpdate } from '../../utils';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import AppButton from '../../components/AppButton';
import Chart from '../../components/Chart';
import ButtonGroup from '../../components/ButtonGroup';
import ExchangeInfo from '../../components/ExchangeInfo';

const ExchangeOverviewScreen = ({ route }) => {
  const exchangeId = route?.params?.id;
  const exchangeDetails = useSelector((state) => state.exchangeDetails.exchangeDetails[exchangeId]);
  const exchangeDetailsStatus = useSelector((state) => state.exchangeDetails.status);
  const { btcExchangeRates, status: exchangeRatesStatus } = useSelector(
    (state) => state.btcExchangeRates
  );
  const { timeInterval } = useSelector((state) => state.settings.coinChartSettings);
  const { volumeChart, status: chartStatus } = useSelector((state) => state.exchangeChart);
  const referenceCurrency = useSelector((state) => state.settings.referenceCurrency);
  const dispatch = useDispatch();

  const getExchangeData = useCallback(() => {
    const shouldUpdateExchangeDetails = shouldUpdate(exchangeDetails?.lastUpdated, 1000 * 60 * 5);
    if ((exchangeId && !exchangeDetails) || (exchangeId && shouldUpdateExchangeDetails)) {
      dispatch(getExchangeDetails(exchangeId));
    }

    const shouldUpdateExchangeRates = shouldUpdate(btcExchangeRates?.lastUpdated, 1000 * 60 * 5);
    if (!btcExchangeRates || shouldUpdateExchangeRates) {
      dispatch(getBtcExchangeRates());
    }
  }, [dispatch, exchangeId, exchangeDetails, btcExchangeRates]);

  useEffect(() => {
    getExchangeData();
  }, [getExchangeData]);

  const getVolumeChartData = useCallback(() => {
    if (exchangeId) {
      dispatch(getExchangeVolumeChart(exchangeId, timeInterval));
    }
  }, [dispatch, exchangeId, timeInterval]);

  useEffect(() => {
    getVolumeChartData();
  }, [getVolumeChartData]);

  if (exchangeDetailsStatus === 'loading' || exchangeRatesStatus === 'loading')
    return <Spinner size="large" stretch />;

  if (exchangeDetailsStatus === 'error') {
    const onRetry = () => {
      getExchangeData();
      getVolumeChartData();
    };
    return (
      <ErrorMessage message="An error has occurred." stretch>
        <AppButton title="Retry" onPress={onRetry} stretch />
      </ErrorMessage>
    );
  }

  if (!exchangeDetails) return null;

  const chartData = volumeChart?.map(([date, price]) => ({
    x: date,
    y: convertBtcToCurrency(+price, btcExchangeRates?.[referenceCurrency]?.value) ?? +price,
  }));

  const handleTimeIntervalChange = (interval) => {
    dispatch(setCoinChartInterval(interval));
  };

  const getButtonColor = (interval) => (interval === timeInterval ? 'info' : 'primary');

  const {
    trust_score_rank,
    trade_volume_24h_btc,
    year_established,
    country,
    url,
    facebook_url,
    twitter_handle,
    description,
  } = exchangeDetails;

  const tradeVolume = convertBtcToCurrency(
    trade_volume_24h_btc,
    btcExchangeRates?.[referenceCurrency]?.value
  );

  return (
    <ScrollView style={sharedStyles.screenContainer}>
      <Chart
        data={chartData}
        isLoading={chartStatus === 'loading'}
        error={chartStatus === 'error'}
      />
      <ButtonGroup>
        {[
          { label: '1d', period: 1 },
          { label: '7d', period: 7 },
          { label: '14d', period: 14 },
          { label: '1m', period: 30 },
          { label: '3m', period: 90 },
          { label: '6m', period: 180 },
          { label: '1y', period: 365 },
        ].map(({ label, period }) => (
          <ButtonGroup.Item
            key={label}
            title={label}
            onPress={() => handleTimeIntervalChange(period)}
            size="small"
            color={getButtonColor(period)}
            rounded
          />
        ))}
      </ButtonGroup>
      <ExchangeInfo
        rank={trust_score_rank}
        tradeVolume={tradeVolume}
        referenceCurrency={referenceCurrency}
        established={year_established}
        country={country}
        homepage={url}
        facebook={facebook_url}
        twitter={`https://twitter.com/${twitter_handle}`}
        description={description}
      />
    </ScrollView>
  );
};

export default ExchangeOverviewScreen;
