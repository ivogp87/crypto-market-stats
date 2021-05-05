import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CoinListScreen, { coinListScreenOptions } from '../../screens/CoinListScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Coin List" component={CoinListScreen} options={coinListScreenOptions} />
  </Tab.Navigator>
);

export default HomeNavigator;
