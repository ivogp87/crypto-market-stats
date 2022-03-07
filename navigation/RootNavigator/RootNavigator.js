import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigator from '../HomeNavigator';
import CoinNavigator from '../CoinNavigator';
import ExchangeNavigator from '../ExchangeNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeNavigator} />
    <Stack.Screen name="Coin" component={CoinNavigator} />
    <Stack.Screen name="Exchange" component={ExchangeNavigator} />
  </Stack.Navigator>
);

export default RootNavigator;
