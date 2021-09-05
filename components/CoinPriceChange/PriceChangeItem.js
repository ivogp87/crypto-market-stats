import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { formatPercent, formatAndAbbreviateCurrency } from '../../utils';
import styles from './styles';
import AppText from '../AppText';

const PriceChangeItem = ({ period, percentChange, priceChange, referenceCurrency }) => (
  <View style={styles.item}>
    <View style={styles.itemHeader}>
      <AppText size="large" bold>
        {period}
      </AppText>
    </View>
    <View style={styles.itemBody}>
      <AppText size="large" color="secondary" numberOfLines={1} style={styles.percentChange}>
        {formatPercent(percentChange)}
      </AppText>
      <AppText size="large" color="secondary" numberOfLines={1}>
        {priceChange < 0 ? '-' : ''}
        {formatAndAbbreviateCurrency(Math.abs(priceChange), referenceCurrency)}
      </AppText>
    </View>
  </View>
);

PriceChangeItem.propTypes = {
  period: PropTypes.string.isRequired,
  percentChange: PropTypes.number.isRequired,
  priceChange: PropTypes.number.isRequired,
  referenceCurrency: PropTypes.string.isRequired,
};

export default PriceChangeItem;
