import React from 'react';
import { View, Platform, Share } from 'react-native';

import themedStyles from './styles';
import { useStyles } from '../../hooks';

import AppText from '../AppText';
import Heading from '../Heading';
import Link from '../Link';

const AboutUs = () => {
  const styles = useStyles(themedStyles);

  const handleShare = async () => {
    try {
      await Share.share({
        title: 'Crypto app recommendation',
        message:
          'Install CryptoMarketStats - free crypto price tracker: https://play.google.com/store/apps/details?id=net.cryptomarketstats',
      });
      // eslint-disable-next-line no-empty
    } catch (_error) {}
  };

  return (
    <>
      <Heading
        iconName={Platform.OS === 'android' ? 'md-information-circle' : 'ios-information-circle'}
      >
        About
      </Heading>
      <View style={styles.aboutUs}>
        <Link
          href="mailto:hello@cryptomarketstats.net"
          target="browser"
          size="large"
          style={styles.link}
        >
          Contact Us
        </Link>
        <Link
          href="market://details?id=net.cryptomarketstats"
          target="browser"
          size="large"
          style={styles.link}
        >
          Rate Us
        </Link>
        <AppText color="info" size="large" style={styles.link} onPress={handleShare}>
          Share App
        </AppText>
        <Link
          href="https://cryptomarketstats.net/privacy-policy.html"
          size="large"
          style={styles.link}
        >
          Privacy Policy
        </Link>
      </View>
    </>
  );
};

export default AboutUs;
