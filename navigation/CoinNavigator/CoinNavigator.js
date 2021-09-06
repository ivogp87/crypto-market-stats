import React, { useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux';

import { toggleFavoriteCoin } from '../../redux/actions';

import CoinOverviewScreen from '../../screens/CoinOverviewScreen';
import CoinMarketsScreen from '../../screens/CoinMarketsScreen';
import CoinHeaderTitle from '../../components/CoinHeaderTitle';
import CoinHeaderRight from '../../components/CoinHeaderRight';

const Tab = createMaterialTopTabNavigator();

const CoinNavigator = ({ navigation, route }) => {
  const { id, name, symbol, iconUrl } = route.params?.params || {};
  const favoriteCoinIds = useSelector((state) => state.settings.favoriteCoinIds);
  const isFavoriteCoin = favoriteCoinIds.includes(id);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CoinHeaderTitle name={name} id={id} symbol={symbol} iconUrl={iconUrl} />,
      headerRight: () => (
        <CoinHeaderRight
          onFavorite={() => dispatch(toggleFavoriteCoin(id))}
          isFavoriteCoin={isFavoriteCoin}
        />
      ),
    });
  }, [navigation, id, name, symbol, iconUrl, isFavoriteCoin, dispatch]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Coin Overview"
        component={CoinOverviewScreen}
        options={{ title: 'Overview' }}
      />
      <Tab.Screen
        name="Coin Markets"
        component={CoinMarketsScreen}
        options={{ title: 'Markets' }}
        initialParams={{ coinId: id }}
      />
    </Tab.Navigator>
  );
};

export default CoinNavigator;
