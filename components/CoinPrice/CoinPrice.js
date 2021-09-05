import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { formatCurrency, formatPercent } from '../../utils';

import styles from './styles';

import AppText from '../AppText';

const CoinPrice = ({ price, priceChangePercentage, referenceCurrency }) => {
  const priceChangeColor = priceChangePercentage > 0 ? 'success' : 'danger';
  return (
    <View style={styles.coinPrice}>
      <AppText size="extra large" bold>
        {formatCurrency(price, referenceCurrency)}
      </AppText>
      <AppText size="extra large" color={priceChangeColor} bold>
        {formatPercent(priceChangePercentage)}
      </AppText>
    </View>
  );
};

CoinPrice.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  priceChangePercentage: PropTypes.number.isRequired,
  referenceCurrency: PropTypes.string.isRequired,
};

export default CoinPrice;
