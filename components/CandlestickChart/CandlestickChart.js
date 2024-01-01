import React from 'react';
import PropTypes from 'prop-types';
import { View, useWindowDimensions } from 'react-native';
import { VictoryChart, VictoryCandlestick, VictoryAxis } from 'victory-native';

import { useColors, useStyles } from '../../hooks';

import themedStyles from './styles';

import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const CandlestickChart = ({ data, isLoading, error }) => {
  const { width, height } = useWindowDimensions();
  const chartWidth = width;
  const chartHeight = height * 0.3;
  const colors = useColors();
  const styles = useStyles(themedStyles, chartWidth, chartHeight);

  if (isLoading) {
    return (
      <View style={styles.chartSize}>
        <Spinner size="large" stretch />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.chartSize}>
        <ErrorMessage message="Something went wrong. We can't load the chart right now." stretch />
      </View>
    );
  }

  if (!data || !Array.isArray(data) || !data?.length) return null;

  const lowestPrices = data.map(({ high }) => high);
  const lowestPrice = Math.min(...lowestPrices);

  const highestPrices = data.map(({ low }) => low);
  const highestPrice = Math.max(...highestPrices);

  return (
    <View style={styles.chartSize}>
      <VictoryChart
        width={chartWidth}
        height={chartHeight}
        minDomain={{ y: lowestPrice }}
        maxDomain={{ y: highestPrice }}
        padding={{ top: 8, right: 8, bottom: 16, left: 60 }}
      >
        <VictoryAxis
          fixLabelOverlap
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent', fontSize: 0 },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'transparent' },
            grid: { stroke: colors.borderSecondary },
            tickLabels: { fill: colors.textPrimary },
          }}
        />
        <VictoryCandlestick
          candleColors={{ positive: colors.success, negative: colors.danger }}
          data={data}
        />
      </VictoryChart>
    </View>
  );
};

CandlestickChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      open: PropTypes.number,
      close: PropTypes.number,
      high: PropTypes.number,
      low: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};

CandlestickChart.defaultProps = {
  data: null,
  error: false,
};
export default CandlestickChart;
