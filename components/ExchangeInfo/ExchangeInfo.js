import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

import styles from './styles';
import { formatAndAbbreviateCurrency, formatLinkAnchor } from '../../utils';

import Heading from '../Heading';
import DividedRow from '../DividedRow';
import Link from '../Link';
import TextBlock from '../TextBlock';

const ExchangeInfo = ({
  rank,
  tradeVolume,
  referenceCurrency,
  established,
  country,
  homepage,
  facebook,
  twitter,
  description,
}) => (
  <ScrollView style={styles.exchangeInfo}>
    <Heading iconName="stats-chart">Stats</Heading>
    <DividedRow textLeft="Rank" textRight={rank} />
    {!!tradeVolume && (
      <DividedRow
        textLeft="Volume 24h"
        textRight={formatAndAbbreviateCurrency(tradeVolume, referenceCurrency)}
      />
    )}
    {!!established && <DividedRow textLeft="Established" textRight={established} />}
    {!!country && <DividedRow textLeft="Country" textRight={country} />}
    {(!!homepage || !!facebook || !!twitter) && (
      <View style={styles.marginTop}>
        <Heading iconName="link">Links</Heading>
        {!!homepage && (
          <DividedRow textLeft="Homepage">
            <Link href={homepage}>{formatLinkAnchor(homepage)}</Link>
          </DividedRow>
        )}
        {!!facebook && (
          <DividedRow textLeft="Facebook">
            <Link href={facebook}>{formatLinkAnchor(facebook)}</Link>
          </DividedRow>
        )}
        {!!twitter && (
          <DividedRow textLeft="Twitter">
            <Link href={twitter}>{formatLinkAnchor(twitter)}</Link>
          </DividedRow>
        )}
      </View>
    )}
    {!!description && (
      <>
        <Heading iconName="information-circle-outline" style={styles.marginTop}>
          Description
        </Heading>
        <TextBlock style={styles.description}>{description}</TextBlock>
      </>
    )}
  </ScrollView>
);

ExchangeInfo.propTypes = {
  rank: PropTypes.number.isRequired,
  tradeVolume: PropTypes.number,
  referenceCurrency: PropTypes.string.isRequired,
  established: PropTypes.number,
  country: PropTypes.string,
  homepage: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  description: PropTypes.string,
};

export default ExchangeInfo;
