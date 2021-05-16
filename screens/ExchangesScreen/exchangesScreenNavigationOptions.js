/* eslint-disable react/prop-types */
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item } from 'react-navigation-header-buttons';

import AppHeaderButtons from '../../components/AppHeaderButtons';

export const exchangesStackNavigatorOptions = () => ({
  headerTitle: 'Exchanges',
  headerRight: () => (
    <AppHeaderButtons>
      <Item
        title="search"
        iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
        onPress={() => {}}
      />
    </AppHeaderButtons>
  ),
});

export const exchangesTabNavigatorOptions = () => ({
  tabBarLabel: 'Exchanges',
  tabBarIcon: ({ color, size }) => (
    <Ionicons
      name={Platform.OS === 'android' ? 'md-repeat' : 'ios-repeat'}
      color={color}
      size={size}
    />
  ),
});
