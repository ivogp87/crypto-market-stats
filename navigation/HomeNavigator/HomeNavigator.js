/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CoinsScreen from '../../screens/CoinsScreen';
import ExchangesScreen from '../../screens/ExchangesScreen';

import CoinsListHeaderRight from '../../components/CoinsListHeaderRight/CoinsListHeaderRight';

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case 'Favorite Coins':
      return 'Favorites';
    case 'Exchanges':
      return 'Exchanges';
    default:
      return 'Cryptocurrency Stats';
  }
};

const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation, route }) => {
  useEffect(() => {
    const headerTitle = getHeaderTitle(route);

    const openSearchScreen = () => {
      navigation.navigate('Search');
    };

    navigation.setOptions({
      headerTitle,
      headerRight: () => <CoinsListHeaderRight onSearch={openSearchScreen} />,
    });
  }, [navigation, route]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Coins"
        component={CoinsScreen}
        options={{
          tabBarLabel: 'Coins',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-stats-chart' : 'ios-stats-chart'}
              color={color}
              size={size}
            />
          ),
        }}
        initialParams={{ displayFavoriteCoins: false }}
      />
      <Tab.Screen
        name="Favorite Coins"
        component={CoinsScreen}
        initialParams={{ displayFavoriteCoins: true }}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-star' : 'ios-star'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exchanges"
        component={ExchangesScreen}
        options={{
          tabBarLabel: 'Exchanges',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-repeat' : 'ios-repeat'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
