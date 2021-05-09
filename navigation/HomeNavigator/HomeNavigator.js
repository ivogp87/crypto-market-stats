import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CoinsScreen, { coinsScreenOptions } from '../../screens/CoinsScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Coin List" component={CoinsScreen} options={coinsScreenOptions} />
  </Tab.Navigator>
);

export default HomeNavigator;
