import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { iconSize } from '../../styles';
import { stylePropTypes } from '../../utils';

const placeholder =
  'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@9ab8d6934b83a4aa8ae5e8711609a70ca0ab1b2b/128/color/generic.png';

const Logo = ({ url, size, style }) => {
  const dimensions = iconSize[size] || iconSize.medium;

  const styles = StyleSheet.compose(
    {
      width: dimensions,
      height: dimensions,
    },
    style
  );

  return <Image source={url} placeholder={placeholder} style={styles} />;
};

Logo.propTypes = {
  url: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  style: stylePropTypes,
};

Logo.defaultProps = {
  url: null,
  size: 'medium',
  style: null,
};

export default Logo;
