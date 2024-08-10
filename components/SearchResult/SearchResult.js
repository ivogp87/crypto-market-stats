import React from 'react';
import { View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import themedStyles from './styles';

import { useStyles, useColors } from '../../hooks';
import { formatCurrency } from '../../utils';

import AppText from '../AppText';
import Logo from '../Logo';

const SearchResult = ({
  id,
  name,
  symbol = '',
  rank,
  iconUrl,
  price,
  referenceCurrency,
  isFavorite,
  showBorder,
  onPress,
  onFavorite,
}) => {
  const styles = useStyles(themedStyles, showBorder);
  const colors = useColors();

  const handlePress = () => {
    onPress(id, name, iconUrl, symbol);
  };

  const handleFavorite = () => {
    onFavorite?.(id);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      android_ripple={{ color: colors.ripple }}
    >
      <View style={styles.coinBranding}>
        <Logo size="large" url={iconUrl} id={id} />
        <View style={symbol ? styles.coinNames : styles.exchangeName}>
          <AppText bold numberOfLines={1}>
            {name}
          </AppText>
          {!!symbol && (
            <AppText size="small" color="secondary" style={styles.coinSymbol}>
              {`${rank ? `${rank}. ` : ''}${symbol}`}
            </AppText>
          )}
        </View>
      </View>
      <View style={styles.priceContainer}>
        {price && referenceCurrency && (
          <AppText bold numberOfLines={1} style={styles.prices}>
            {formatCurrency(price, referenceCurrency)}
          </AppText>
        )}
        {onFavorite && (
          <Pressable onPress={handleFavorite} hitSlop={16}>
            <Ionicons
              name={isFavorite ? 'star' : 'star-outline'}
              size={16}
              color={isFavorite ? colors.warning : colors.textPrimary}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

SearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconUrl: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  referenceCurrency: PropTypes.string,
  isFavorite: PropTypes.bool,
  showBorder: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  onFavorite: PropTypes.func,
};

export default SearchResult;
