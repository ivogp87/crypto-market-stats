/* eslint-disable react/prop-types */
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item } from 'react-navigation-header-buttons';

import AppHeaderButtons from '../../components/AppHeaderButtons';

const coinsScreenOptions = () => ({
  headerTitle: 'Cryptocurrency Stats',
  headerRight: () => (
    <AppHeaderButtons>
      <Item
        title="search"
        iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
        onPress={() => {}}
      />
    </AppHeaderButtons>
  ),
  tabBarLabel: 'Coins',
  tabBarIcon: ({ color, size }) => (
    <Ionicons
      name={Platform.OS === 'android' ? 'md-stats-chart' : 'ios-stats-chart'}
      color={color}
      size={size}
    />
  ),
});

export default coinsScreenOptions;
