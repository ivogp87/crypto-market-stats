import React from 'react';
import PropTypes from 'prop-types';
import { View, useWindowDimensions } from 'react-native';
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory-native';

import themedStyles from './styles';
import { useColors, useStyles } from '../../hooks';
import { abbreviateNumber } from '../../utils';

import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const Chart = ({ data, isLoading, error }) => {
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

  const prices = data.map((item) => item.y);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const formatTick = (tick) => {
    const ticks = data.map((item) => item.y);
    return ticks.some((t) => t >= 100000) ? abbreviateNumber(tick) : tick;
  };

  return (
    <View style={styles.chartSize}>
      <VictoryChart
        width={chartWidth}
        height={chartHeight}
        minDomain={{ y: lowestPrice }}
        maxDomain={{ y: highestPrice }}
        padding={{ top: 8, right: 8, bottom: 16, left: 60 }}
      >
        <VictoryArea
          interpolation="natural"
          data={data}
          style={{
            data: { stroke: colors.textPrimary, fill: 'transparent' },
          }}
        />
        <VictoryAxis
          fixLabelOverlap
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent', fontSize: 0 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={formatTick}
          style={{
            axis: { stroke: 'transparent' },
            grid: { stroke: colors.borderSecondary },
            tickLabels: { fill: colors.textPrimary },
          }}
        />
      </VictoryChart>
    </View>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number.isRequired })
  ),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};

Chart.defaultProps = {
  data: null,
  error: null,
};

export default Chart;
