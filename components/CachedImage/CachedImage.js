import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import PropTypes from 'prop-types';

const CachedImage = ({ url, cacheKey, ...rest }) => {
  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`;

  const [imgURI, setImgURI] = useState(filesystemURI);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const loadImage = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(filesystemURI);
        if (!fileInfo.exists) {
          if (isMounted.current) {
            setImgURI(
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
            );
            await FileSystem.downloadAsync(url, filesystemURI);
          }
          if (isMounted.current) {
            setImgURI(filesystemURI);
          }
        }
      } catch (err) {
        setImgURI(url);
      }
    };

    loadImage();

    return () => {
      isMounted.current = false;
    };
  }, [filesystemURI, url]);

  return (
    <Image
      {...rest}
      source={{
        uri: imgURI,
      }}
    />
  );
};

CachedImage.propTypes = {
  url: PropTypes.string.isRequired,
  cacheKey: PropTypes.string.isRequired,
};

export default CachedImage;
