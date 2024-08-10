import React from 'react';
import PropTypes from 'prop-types';

import { stylePropTypes } from '../../utils';
import AppText from '../AppText';
import Link from '../Link';

const TextBlock = ({ children, style }) => {
  if (!children || typeof children !== 'string') return null;

  const getTextToDisplay = () => {
    const fullLinkRegex = /(<a[^>]*href=["'][^"']*["'][^>]*>[^<]+<\/a>)/i;
    const singleLinkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([^<]+)<\/a>/i;

    const haveLinks = !!children.match(fullLinkRegex);

    if (!haveLinks) return children;

    const textArray = children.split(fullLinkRegex);

    const textToDisplay = textArray.map((textItem, index) => {
      const isLink = textItem.match(fullLinkRegex);

      if (isLink) {
        const linkParts = textItem.match(singleLinkRegex);
        return (
          <Link key={index} href={linkParts[1]}>
            {linkParts[2]}
          </Link>
        );
      }

      return <React.Fragment key={index}>{textItem}</React.Fragment>;
    });

    return textToDisplay;
  };

  return <AppText style={style}>{getTextToDisplay()}</AppText>;
};

TextBlock.propTypes = {
  children: PropTypes.string.isRequired,
  style: stylePropTypes,
};

export default TextBlock;
