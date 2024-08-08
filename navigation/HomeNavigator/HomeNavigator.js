/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import CoinsScreen from '../../screens/CoinsScreen';
import ExchangesScreen from '../../screens/ExchangesScreen';
import MoreScreen from '../../screens/MoreScreen';

import CoinsListHeaderRight from '../../components/CoinsListHeaderRight/CoinsListHeaderRight';

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case 'Favorite Coins':
      return 'Favorites';
    case 'Exchanges':
      return 'Exchanges';
    case 'More':
      return 'CryptoMarketStats';
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
      headerRight: () =>
        headerTitle !== 'CryptoMarketStats' ? (
          <CoinsListHeaderRight onSearch={openSearchScreen} />
        ) : null,
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
            <Ionicons name="stats-chart" color={color} size={size} />
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
          tabBarIcon: ({ color, size }) => <Ionicons name="star" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Exchanges"
        component={ExchangesScreen}
        options={{
          tabBarLabel: 'Exchanges',
          tabBarIcon: ({ color, size }) => <Ionicons name="repeat" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
