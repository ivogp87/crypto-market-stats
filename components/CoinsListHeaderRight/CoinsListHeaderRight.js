import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'react-navigation-header-buttons';

import AppHeaderButtons from '../AppHeaderButtons';

const CoinsListHeaderRight = ({ onSearch }) => (
  <AppHeaderButtons>
    <Item title="search" iconName="search" onPress={onSearch} />
  </AppHeaderButtons>
);

CoinsListHeaderRight.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default CoinsListHeaderRight;
