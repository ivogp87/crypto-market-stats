import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { convertBtcToCurrency } from '../../utils';

import AppText from '../AppText';
import SearchResult from '../SearchResult';

const SearchResults = ({
  data,
  title,
  referenceCurrency,
  btcExchangeRate,
  favoriteCoinIds,
  onFavorite,
  onPress,
}) => (
  <ScrollView style={styles.container}>
    {!!title && (
      <AppText size="large" bold style={styles.title}>
        {title}
      </AppText>
    )}
    {data.map((searchResult, index) => {
      const { id, name, symbol, market_cap_rank, large, price_btc } = searchResult;
      return (
        <SearchResult
          key={id}
          id={id}
          name={name}
          symbol={symbol}
          rank={market_cap_rank}
          iconUrl={large}
          onPress={onPress}
          price={convertBtcToCurrency(price_btc, btcExchangeRate)}
          referenceCurrency={referenceCurrency}
          isFavorite={favoriteCoinIds?.includes(id)}
          showBorder={index < data.length - 1}
          onFavorite={onFavorite}
        />
      );
    })}
  </ScrollView>
);

SearchResults.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string,
      market_cap_rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      large: PropTypes.string.isRequired,
      price_btc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  title: PropTypes.string,
  btcExchangeRate: PropTypes.number,
  referenceCurrency: PropTypes.string,
  favoriteCoinIds: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func.isRequired,
  onFavorite: PropTypes.func,
};

export default SearchResults;
