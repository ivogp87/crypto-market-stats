import React from 'react';
import PropTypes from 'prop-types';
import { View, Pressable } from 'react-native';

import themedStyles from './styles';
import { useStyles, useColors } from '../../hooks';
import { formatAndAbbreviateCurrency } from '../../utils';

import Logo from '../Logo';
import AppText from '../AppText';

const ExchangeStatsCard = ({
  id,
  name,
  rank,
  iconUrl,
  tradeVolume,
  referenceCurrency,
  onPress,
}) => {
  const styles = useStyles(themedStyles);
  const colors = useColors();

  return (
    <Pressable onPress={onPress} style={styles.container} android_ripple={{ color: colors.ripple }}>
      <View style={styles.exchangeBranding}>
        <AppText bold style={styles.exchangeRank}>
          {
            // eslint-disable-next-line no-unneeded-ternary
            rank ? rank : ' '
          }
        </AppText>
        <Logo size="large" url={iconUrl} id={id} />
        <AppText bold numberOfLines={1} style={styles.exchangeName}>
          {name}
        </AppText>
      </View>
      <View style={styles.tradeVolume}>
        <AppText bold numberOfLines={1}>
          {formatAndAbbreviateCurrency(tradeVolume, referenceCurrency)}
        </AppText>
      </View>
    </Pressable>
  );
};

ExchangeStatsCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.number,
  iconUrl: PropTypes.string.isRequired,
  tradeVolume: PropTypes.number.isRequired,
  referenceCurrency: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ExchangeStatsCard;
