import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeNavigator from '../HomeNavigator';
import { coinsScreenOptions } from '../../screens/CoinsScreen';

const Stack = createStackNavigator();

const getScreenOptions = (navData) => {
  const routeName = getFocusedRouteNameFromRoute(navData.route);
  switch (routeName) {
    default:
      return coinsScreenOptions(navData);
  }
};

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeNavigator}
      options={(navData) => getScreenOptions(navData)}
    />
  </Stack.Navigator>
);

export default RootNavigator;
