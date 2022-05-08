import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SelectCurrencyScreen from '../../screens/SelectCurrencyScreen';

const Tab = createMaterialTopTabNavigator();

const SelectCurrencyNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Fiat"
      component={SelectCurrencyScreen}
      initialParams={{ currencyType: 'fiat' }}
    />
    <Tab.Screen
      name="Crypto"
      component={SelectCurrencyScreen}
      initialParams={{ currencyType: 'crypto' }}
    />
  </Tab.Navigator>
);

export default SelectCurrencyNavigator;
