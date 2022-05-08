import React, { useEffect, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import {
  setSearchQuery,
  getSearchResults,
  clearSearchResults,
  setCurrencyToFind,
} from '../../redux/actions';

import HomeNavigator from '../HomeNavigator';
import CoinNavigator from '../CoinNavigator';
import ExchangeNavigator from '../ExchangeNavigator';
import SelectCurrencyNavigator from '../SelectCurrencyNavigator';

import SearchScreen from '../../screens/SearchScreen';
import SearchBar from '../../components/SearchBar';
import AppButton from '../../components/AppButton';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { searchQuery, coins, exchanges, status: searchResultsStatus } = useSelector(
    (state) => state.searchResults
  );

  const currencyToFind = useSelector((state) => state.settings.currencyToFind);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchQuery && (coins || exchanges)) {
      dispatch(clearSearchResults());
    }
  }, [dispatch, searchQuery, coins, exchanges]);

  const handleSearch = useCallback(() => {
    if (searchQuery?.length > 1) {
      dispatch(getSearchResults(searchQuery));
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [handleSearch]);

  const handleTextChange = (text) => {
    dispatch(setSearchQuery(text));
  };

  const handleCurrencyToFindTextChange = (string) => {
    dispatch(setCurrencyToFind(string));
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="Coin" component={CoinNavigator} />
      <Stack.Screen name="Exchange" component={ExchangeNavigator} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <SearchBar
              text={searchQuery}
              isSearching={searchResultsStatus === 'loading'}
              onChangeText={handleTextChange}
              onSubmitEditing={handleSearch}
              onClear={() => handleTextChange('')}
            />
          ),
          headerRight: () => <AppButton title="Cancel" size="small" onPress={navigation.goBack} />,
        })}
      />
      <Stack.Screen
        name="Select Currency"
        component={SelectCurrencyNavigator}
        options={({ navigation }) => ({
          headerTitle: () => (
            <SearchBar
              text={currencyToFind}
              placeholder="Find currency"
              onChangeText={handleCurrencyToFindTextChange}
              onSubmitEditing={() => handleCurrencyToFindTextChange(currencyToFind)}
              onClear={() => handleCurrencyToFindTextChange('')}
            />
          ),
          headerRight: () => <AppButton title="Cancel" size="small" onPress={navigation.goBack} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
