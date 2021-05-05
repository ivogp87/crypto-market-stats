import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { useColors } from '../../hooks';
import { iconSize as size } from '../../styles';

const AppHeaderButton = (props) => {
  const { textPrimary } = useColors();
  return (
    <HeaderButton IconComponent={Ionicons} iconSize={size.medium} color={textPrimary} {...props} />
  );
};

export default AppHeaderButton;
