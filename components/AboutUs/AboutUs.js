import React from 'react';
import { View, Platform } from 'react-native';

import themedStyles from './styles';
import { useStyles } from '../../hooks';

import Heading from '../Heading';
import Link from '../Link';

const AboutUs = () => {
  const styles = useStyles(themedStyles);

  return (
    <>
      <Heading
        iconName={Platform.OS === 'android' ? 'md-information-circle' : 'ios-information-circle'}
      >
        About
      </Heading>
      <View style={styles.aboutUs}>
        <Link href="mailto:hello@cryptomarketstats.net" size="large" style={styles.link}>
          Contact Us
        </Link>
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
