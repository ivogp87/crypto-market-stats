import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { iconSize } from '../../styles';

import CachedImage from '../CachedImage';

const Logo = ({ url, id, size, style }) => {
  const dimensions = iconSize[size] || iconSize.medium;
  const imageUrl =
    url ||
    'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@9ab8d6934b83a4aa8ae5e8711609a70ca0ab1b2b/128/color/generic.png';

  return (
    <CachedImage
      url={imageUrl}
      cacheKey={`${url ? id : 'generic'}-logo`}
      style={StyleSheet.compose(
        {
          width: dimensions,
          height: dimensions,
          resizeMode: 'center',
          overflow: 'hidden',
        },
        style
      )}
    />
  );
};

Logo.propTypes = {
  url: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.string.isRequired,
};

Logo.defaultProps = {
  url: null,
  size: 'medium',
  style: {},
};

export default Logo;
