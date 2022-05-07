import React from 'react';
import { View } from 'react-native';

import styles from './styles';

import AppText from '../AppText';
import Link from '../Link';

const FooterCredits = () => (
  <View style={styles.container}>
    <AppText>Powered by </AppText>
    <Link href="https://www.coingecko.com/">CoinGecko</Link>
  </View>
);

export default FooterCredits;
