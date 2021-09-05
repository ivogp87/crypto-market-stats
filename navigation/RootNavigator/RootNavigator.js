import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeNavigator from '../HomeNavigator';
import CoinNavigator from '../CoinNavigator';

import {
  coinsStackNavigatorOptions,
  favoriteCoinsStackNavigatorOptions,
} from '../../screens/CoinsScreen';
import { exchangesStackNavigatorOptions } from '../../screens/ExchangesScreen';

const Stack = createStackNavigator();

const getScreenOptions = (navData) => {
  const routeName = getFocusedRouteNameFromRoute(navData.route) || navData.route.name;
  switch (routeName) {
    case 'Favorite Coins':
      return favoriteCoinsStackNavigatorOptions(navData);
    case 'Exchanges':
      return exchangesStackNavigatorOptions(navData);
    default:
      return coinsStackNavigatorOptions(navData);
  }
};

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeNavigator} options={getScreenOptions} />
    <Stack.Screen name="Coin" component={CoinNavigator} options={getScreenOptions} />
  </Stack.Navigator>
);

export default RootNavigator;
