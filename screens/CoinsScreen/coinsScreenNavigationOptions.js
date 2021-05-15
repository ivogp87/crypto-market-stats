/* eslint-disable react/prop-types */
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item } from 'react-navigation-header-buttons';

import AppHeaderButtons from '../../components/AppHeaderButtons';

const HeaderRight = () => (
  <AppHeaderButtons>
    <Item
      title="search"
      iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
      onPress={() => {}}
    />
  </AppHeaderButtons>
);

export const coinsStackNavigatorOptions = () => ({
  headerTitle: 'Cryptocurrency Stats',
  headerRight: () => HeaderRight(),
});

export const favoriteCoinsStackNavigatorOptions = () => ({
  headerTitle: 'Favorites',
  headerRight: () => HeaderRight(),
});

export const coinsTabNavigatorOptions = ({ route }) => {
  const displayFavoriteCoins = route?.params?.displayFavoriteCoins;

  return {
    tabBarLabel: displayFavoriteCoins ? 'Favorites' : 'Coins',
    tabBarIcon: ({ color, size }) => {
      let icon;

      if (displayFavoriteCoins) {
        icon = Platform.OS === 'android' ? 'md-star' : 'ios-star';
      } else {
        icon = Platform.OS === 'android' ? 'md-stats-chart' : 'ios-stats-chart';
      }
      return <Ionicons name={icon} color={color} size={size} />;
    },
  };
};
