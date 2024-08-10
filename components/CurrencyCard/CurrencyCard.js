import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import styles from './styles';
import { useColors } from '../../hooks';

import AppText from '../AppText';
import Logo from '../Logo';

const CurrencyCard = ({ currencyName, currencySymbol, logoUrl, isSelected, onPress }) => {
  const colors = useColors();

  const handlePress = () => {
    onPress?.(currencySymbol);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      android_ripple={{ color: colors.ripple }}
    >
      <View style={styles.currencyDetails}>
        <View style={styles.logoContainer}>
          {!!logoUrl && <Logo size="large" url={logoUrl} id={currencySymbol} />}
        </View>
        <View style={styles.currencyNames}>
          <AppText size="large" style={styles.name} numberOfLines={1}>
            {currencyName}
          </AppText>
          <AppText style={styles.symbol} color="secondary">
            {currencySymbol}
          </AppText>
        </View>
      </View>
      {isSelected && <Ionicons name="checkmark" size={16} color={colors.success} />}
    </Pressable>
  );
};

CurrencyCard.propTypes = {
  currencyName: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CurrencyCard;
