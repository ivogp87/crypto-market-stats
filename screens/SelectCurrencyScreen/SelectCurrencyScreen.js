import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { sharedStyles } from '../../styles';
import cryptoCurrencies from './cryptoCurrencies';
import fiatCurrencies from './fiatCurrencies';
import { getSupportedCurrencies, selectCurrency, setCurrencyToFind } from '../../redux/actions';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import AppButton from '../../components/AppButton';
import CurrencyCard from '../../components/CurrencyCard';
import ListItemSeparator from '../../components/ListItemSeparator';

const SelectCurrencyScreen = ({ route }) => {
  const currencyType = route.params?.currencyType;

  const { supportedCurrencies, status } = useSelector((state) => state.supportedCurrencies);
  const selectedCurrency = useSelector((state) => state.settings.referenceCurrency);
  const currencyToFind = useSelector((state) => state.settings.currencyToFind);

  let cryptoCurrenciesList = cryptoCurrencies.filter((currency) =>
    supportedCurrencies?.includes(currency.symbol)
  );
  let fiatCurrenciesList = fiatCurrencies.filter((currency) =>
    supportedCurrencies?.includes(currency.symbol)
  );

  if (currencyToFind) {
    const filterCurrency = (currency) =>
      currency.name.toLowerCase().includes(currencyToFind) ||
      currency.symbol.toLowerCase().includes(currencyToFind);

    cryptoCurrenciesList = cryptoCurrenciesList?.filter(filterCurrency);
    fiatCurrenciesList = fiatCurrenciesList?.filter(filterCurrency);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (!supportedCurrencies?.length && status !== 'loading') {
      dispatch(getSupportedCurrencies());
    }
  }, [dispatch, supportedCurrencies?.length, status]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(setCurrencyToFind(''));
    };
  }, [dispatch]);

  const handleSelectCurrency = (currency) => {
    dispatch(selectCurrency(currency));
  };

  const keyExtractor = (item) => item.symbol;

  const renderCurrencyList = ({ item }) => (
    <CurrencyCard
      currencyName={item.name}
      currencySymbol={item.symbol}
      logoUrl={item.logoUrl}
      isSelected={item.symbol === selectedCurrency}
      onPress={handleSelectCurrency}
    />
  );

  if (status === 'loading') {
    return <Spinner size="large" stretch />;
  }

  if (status === 'error') {
    return (
      <ErrorMessage message="Something went wrong. Please try again." stretch>
        <AppButton title="Retry" onPress={() => dispatch(getSupportedCurrencies())} stretch />
      </ErrorMessage>
    );
  }

  if (!supportedCurrencies?.length) {
    return null;
  }

  return (
    <View style={sharedStyles.screenContainer}>
      <FlatList
        keyExtractor={keyExtractor}
        data={currencyType === 'fiat' ? fiatCurrenciesList : cryptoCurrenciesList}
        renderItem={renderCurrencyList}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
};

export default SelectCurrencyScreen;
