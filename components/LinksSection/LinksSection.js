import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './styles';
import { formatLinkAnchor } from '../../utils';

import DividedRow from '../DividedRow';
import Link from '../Link';

const LinksSection = ({ title, linkList }) => {
  if (!linkList?.length) return null;

  if (linkList.length === 1) {
    return (
      <DividedRow textLeft={title}>
        <Link href={linkList[0]}>{formatLinkAnchor(linkList[0])}</Link>
      </DividedRow>
    );
  }

  return (
    <DividedRow textLeft={title}>
      <View style={styles.linkList}>
        {linkList.map((link) => (
          <Link key={link} href={link}>
            {formatLinkAnchor(link)}
          </Link>
        ))}
      </View>
    </DividedRow>
  );
};

LinksSection.propTypes = {
  title: PropTypes.string.isRequired,
  linkList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LinksSection;
