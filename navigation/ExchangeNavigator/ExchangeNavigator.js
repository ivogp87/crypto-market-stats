import React, { useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ExchangeOverviewScreen from '../../screens/ExchangeOverviewScreen';

import HeaderLogoTitle from '../../components/HeaderLogoTitle';

const Tab = createMaterialTopTabNavigator();

const ExchangeNavigator = ({ navigation, route }) => {
  const { id, name, iconUrl } = route.params?.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderLogoTitle name={name} id={id} iconUrl={iconUrl} />,
    });
  }, [navigation, id, name, iconUrl]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Exchange Overview"
        component={ExchangeOverviewScreen}
        options={{ title: 'Overview' }}
      />
    </Tab.Navigator>
  );
};

export default ExchangeNavigator;
