import React from 'react';
import { View, Pressable, Platform, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { VictoryLine, VictoryContainer } from 'victory-native';

import themedStyles from './styles';
import { useStyles, useColors } from '../../hooks';
import { formatCurrency, formatPercent, formatAndAbbreviateCurrency } from '../../utils';

import AppText from '../AppText';
import Logo from '../Logo';

const CoinStatsCard = ({
  id,
  onPress,
  name,
  symbol,
  rank,
  iconUrl,
  price,
  priceChangePercent,
  marketCap,
  referenceCurrency,
  sparklineData,
  isFavorite,
  onFavorite,
}) => {
  const styles = useStyles(themedStyles);
  const colors = useColors();
  const windowWidth = useWindowDimensions().width;

  let priceChangeColor = 'info';
  if (Number(priceChangePercent) > 0) {
    priceChangeColor = 'success';
  }
  if (Number(priceChangePercent) < 0) {
    priceChangeColor = 'danger';
  }

  let favoriteIconName;
  if (isFavorite) {
    favoriteIconName = Platform.OS === 'android' ? 'md-star' : 'ios-star';
  } else {
    favoriteIconName = Platform.OS === 'android' ? 'md-star-outline' : 'ios-star-outline';
  }

  return (
    <Pressable onPress={onPress} style={styles.container} android_ripple={{ color: colors.ripple }}>
      <View style={styles.coinBranding}>
        <Logo size="large" url={iconUrl} id={id} />
        <View style={styles.coinNames}>
          <AppText bold numberOfLines={1}>
            {name}
          </AppText>
          <AppText size="small" color="secondary" style={styles.coinSymbol}>
            {`${rank ? `${rank}. ` : ''}${symbol}`}
          </AppText>
        </View>
      </View>
      <View style={styles.priceChange}>
        <AppText bold color={priceChangeColor} numberOfLines={1}>
          {formatPercent(priceChangePercent)}
        </AppText>
        {sparklineData && (
          <VictoryLine
            containerComponent={<VictoryContainer disableContainerEvents />}
            style={{
              data: { stroke: colors[priceChangeColor] },
            }}
            width={windowWidth / 7}
            height={16}
            padding={{ top: 0, bottom: 0 }}
            data={sparklineData}
          />
        )}
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.prices}>
          <AppText bold numberOfLines={1}>
            {formatCurrency(price, referenceCurrency)}
          </AppText>
          {marketCap !== null && (
            <AppText size="small" color="secondary" numberOfLines={1}>
              MC {formatAndAbbreviateCurrency(marketCap, referenceCurrency)}
            </AppText>
          )}
        </View>
        <Pressable onPress={onFavorite} hitSlop={16}>
          <Ionicons
            name={favoriteIconName}
            size={16}
            color={isFavorite ? colors.warning : colors.textPrimary}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

CoinStatsCard.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconUrl: PropTypes.string.isRequired,
  priceChangePercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marketCap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sparklineData: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  referenceCurrency: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

CoinStatsCard.defaultProps = {
  rank: null,
  priceChangePercent: null,
  price: null,
  sparklineData: null,
  marketCap: null,
};

export default CoinStatsCard;
