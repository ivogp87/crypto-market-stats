import React from 'react';
import PropTypes from 'prop-types';
import * as Linking from 'expo-linking'; // uninstall if not going to use
import * as WebBrowser from 'expo-web-browser';

import AppText from '../AppText';

const Link = ({ children, href, target = 'in app', ...props }) => {
  const handlePress = () => {
    if (target === 'browser') {
      Linking.openURL(href);
    } else {
      WebBrowser.openBrowserAsync(href);
    }
  };

  return (
    <AppText color="info" {...props} onPress={handlePress}>
      {children}
    </AppText>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.oneOf(['in app', 'browser']),
  children: PropTypes.string.isRequired,
};

export default Link;
