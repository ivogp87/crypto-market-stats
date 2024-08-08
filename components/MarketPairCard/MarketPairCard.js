import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import { useColors } from '../../hooks';
import { formatCurrency, formatAndAbbreviateCurrency } from '../../utils';

import AppText from '../AppText';
import Logo from '../Logo';

const MarketPairCard = ({
  id,
  name,
  logoUrl,
  baseCurrency,
  targetCurrency,
  priceInCurrency,
  priceInBtc,
  referenceCurrency,
  volumeInCurrency,
  volumeInBtc,
  trustScore,
}) => {
  const colors = useColors();

  const trustScoreColors = {
    green: 'success',
    yellow: 'warning',
    red: 'danger',
  };
  const trustScoreColor = trustScoreColors[trustScore] || 'secondary';

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Logo size="large" url={logoUrl} id={id} />
        <View style={styles.marketPair}>
          <AppText bold numberOfLines={1}>
            {`${baseCurrency} / ${targetCurrency}`}
          </AppText>
          <View style={styles.nameContainer}>
            <Ionicons name="shield-checkmark" size={16} color={colors[trustScoreColor]} />
            <AppText color="secondary" numberOfLines={1} style={styles.name}>
              {name}
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.price}>
        <AppText bold numberOfLines={1}>
          {formatCurrency(priceInCurrency, referenceCurrency)}
        </AppText>
        <AppText color="secondary">{formatCurrency(priceInBtc, 'btc')}</AppText>
      </View>
      <View style={styles.volume}>
        <AppText bold numberOfLines={1}>
          {formatAndAbbreviateCurrency(volumeInCurrency, referenceCurrency)}
        </AppText>
        <AppText color="secondary">{formatCurrency(volumeInBtc, 'btc')}</AppText>
      </View>
    </View>
  );
};

MarketPairCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  baseCurrency: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
  priceInCurrency: PropTypes.number.isRequired,
  priceInBtc: PropTypes.number.isRequired,
  referenceCurrency: PropTypes.string.isRequired,
  volumeInCurrency: PropTypes.number.isRequired,
  volumeInBtc: PropTypes.number.isRequired,
  trustScore: PropTypes.string,
};

MarketPairCard.defaultProps = {
  trustScore: null,
};

export default MarketPairCard;
