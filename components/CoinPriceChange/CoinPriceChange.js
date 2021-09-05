import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Platform } from 'react-native';

import styles from './styles';
import Heading from '../Heading';
import PriceChangeItem from './PriceChangeItem';

const CoinPriceChange = ({ data, referenceCurrency }) => {
  if (!data.length) return null;

  return (
    <View style={styles.coinPriceChange}>
      <Heading iconName={Platform.OS === 'android' ? 'md-pulse' : 'ios-pulse'}>Prices</Heading>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.priceChanges}
      >
        {data.map(({ period, percentChange, priceChange }) => (
          <PriceChangeItem
            key={period}
            period={period}
            percentChange={percentChange}
            priceChange={priceChange}
            referenceCurrency={referenceCurrency}
          />
        ))}
      </ScrollView>
    </View>
  );
};

CoinPriceChange.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      period: PropTypes.string.isRequired,
      percentChange: PropTypes.number.isRequired,
      priceChange: PropTypes.number.isRequired,
    })
  ).isRequired,
  referenceCurrency: PropTypes.string.isRequired,
};

export default CoinPriceChange;
