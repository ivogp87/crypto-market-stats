import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';
import Logo from '../Logo';
import AppText from '../AppText';

const CoinHeaderTitle = ({ name, id, symbol, iconUrl }) => (
  <View style={styles.coinHeader}>
    {id && iconUrl && <Logo url={iconUrl} id={id} style={styles.logo} />}
    <AppText size="extra large" numberOfLines={1} bold>
      {name} ({symbol.toUpperCase()})
    </AppText>
  </View>
);

CoinHeaderTitle.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  iconUrl: PropTypes.string,
};

CoinHeaderTitle.defaultProps = {
  iconUrl: null,
};

export default CoinHeaderTitle;
