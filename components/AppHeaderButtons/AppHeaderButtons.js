import React from 'react';
import { HeaderButtons } from 'react-navigation-header-buttons';

import AppHeaderButton from '../AppHeaderButton';

const AppHeaderButtons = (props) => (
  <HeaderButtons HeaderButtonComponent={AppHeaderButton} {...props} />
);

export default AppHeaderButtons;
