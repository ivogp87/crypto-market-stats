import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigator from '../HomeNavigator';
import CoinNavigator from '../CoinNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeNavigator} />
    <Stack.Screen name="Coin" component={CoinNavigator} />
  </Stack.Navigator>
);

export default RootNavigator;
