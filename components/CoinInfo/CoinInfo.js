import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import styles from './styles';
import { formatAndAbbreviateCurrency, abbreviateNumber } from '../../utils';

import Heading from '../Heading';
import DividedRow from '../DividedRow/DividedRow';

const CoinInfo = ({
  referenceCurrency,
  rank,
  marketCap,
  maxSupply,
  totalSupply,
  circulatingSupply,
  tradeVolume,
  high,
  low,
  allTimeHigh,
  allTimeLow,
}) => (
  <ScrollView style={styles.coinInfo}>
    <Heading iconName="stats-chart">Market</Heading>
    <DividedRow textLeft="Rank" textRight={rank} />
    <DividedRow
      textLeft="Market Cap"
      textRight={formatAndAbbreviateCurrency(marketCap, referenceCurrency)}
    />
    {!!maxSupply && <DividedRow textLeft="Max Supply" textRight={abbreviateNumber(maxSupply)} />}
    {!!totalSupply && (
      <DividedRow textLeft="Total Supply" textRight={abbreviateNumber(totalSupply)} />
    )}
    {!!circulatingSupply && (
      <DividedRow textLeft="Circulating Supply" textRight={abbreviateNumber(circulatingSupply)} />
    )}
    <Heading iconName="logo-usd" style={styles.marginTop}>
      Trade
    </Heading>
    {!!tradeVolume && (
      <DividedRow
        textLeft="Trade Volume (24h)"
        textRight={formatAndAbbreviateCurrency(tradeVolume, referenceCurrency)}
      />
    )}
    {!!high && (
      <DividedRow
        textLeft="High (24h)"
        textRight={formatAndAbbreviateCurrency(high, referenceCurrency)}
      />
    )}
    {!!low && (
      <DividedRow
        textLeft="Low (24h)"
        textRight={formatAndAbbreviateCurrency(low, referenceCurrency)}
      />
    )}
    {!!allTimeHigh && (
      <DividedRow
        textLeft="All Time High"
        textRight={formatAndAbbreviateCurrency(allTimeHigh, referenceCurrency)}
      />
    )}
    {!!allTimeLow && (
      <DividedRow
        textLeft="All Time Low"
        textRight={formatAndAbbreviateCurrency(allTimeLow, referenceCurrency)}
      />
    )}
  </ScrollView>
);

CoinInfo.propTypes = {
  referenceCurrency: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  marketCap: PropTypes.number.isRequired,
  maxSupply: PropTypes.number,
  totalSupply: PropTypes.number,
  circulatingSupply: PropTypes.number.isRequired,
  tradeVolume: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
  low: PropTypes.number.isRequired,
  allTimeHigh: PropTypes.number.isRequired,
  allTimeLow: PropTypes.number.isRequired,
};

export default CoinInfo;
