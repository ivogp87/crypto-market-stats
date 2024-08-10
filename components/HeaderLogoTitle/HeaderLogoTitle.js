import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';
import Logo from '../Logo';
import AppText from '../AppText';

const HeaderLogoTitle = ({ name, id, symbol, iconUrl }) => {
  const formattedSymbol = symbol ? ` (${symbol.toUpperCase()})` : null;
  return (
    <View style={styles.coinHeader}>
      {id && iconUrl && <Logo url={iconUrl} id={id} style={styles.logo} />}
      <AppText size="extra large" numberOfLines={1} bold>
        {name}
        {formattedSymbol}
      </AppText>
    </View>
  );
};

HeaderLogoTitle.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  iconUrl: PropTypes.string,
};

export default HeaderLogoTitle;
