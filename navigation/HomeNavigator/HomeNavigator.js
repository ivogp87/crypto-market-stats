import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CoinsScreen, { coinsTabNavigatorOptions } from '../../screens/CoinsScreen';
import ExchangesScreen, { exchangesTabNavigatorOptions } from '../../screens/ExchangesScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Coins"
      component={CoinsScreen}
      options={coinsTabNavigatorOptions}
      initialParams={{ displayFavoriteCoins: false }}
    />
    <Tab.Screen
      name="Favorite Coins"
      component={CoinsScreen}
      options={coinsTabNavigatorOptions}
      initialParams={{ displayFavoriteCoins: true }}
    />
    <Tab.Screen
      name="Exchanges"
      component={ExchangesScreen}
      options={exchangesTabNavigatorOptions}
    />
  </Tab.Navigator>
);

export default HomeNavigator;
