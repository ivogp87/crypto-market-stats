import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CoinsScreen, { coinsTabNavigatorOptions } from '../../screens/CoinsScreen';

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
  </Tab.Navigator>
);

export default HomeNavigator;
