import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'react-navigation-header-buttons';

import { useColors } from '../../hooks';
import AppHeaderButtons from '../AppHeaderButtons';

const CoinHeaderRight = ({ onFavorite, isFavoriteCoin }) => {
  const { textPrimary, warning } = useColors();

  return (
    <AppHeaderButtons>
      <Item
        title="search"
        iconName="star-outline"
        buttonStyle={{ color: isFavoriteCoin ? warning : textPrimary }}
        onPress={onFavorite}
      />
    </AppHeaderButtons>
  );
};

CoinHeaderRight.propTypes = {
  onFavorite: PropTypes.func.isRequired,
  isFavoriteCoin: PropTypes.bool.isRequired,
};

export default CoinHeaderRight;
