import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { sharedStyles } from '../../styles';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import AboutCoin from '../../components/AboutCoin/AboutCoin';

const AboutCoinScreen = ({ route }) => {
  const coinId = route?.params?.coinId;
  const coinDetails = useSelector((state) => state.coinDetails.coinDetails[coinId]);
  const coinDetailsStatus = useSelector((state) => state.coinDetails.status);

  if (coinDetailsStatus === 'loading') {
    return <Spinner size="large" stretch />;
  }

  if (coinDetailsStatus === 'error') {
    return <ErrorMessage message="An error has occurred." stretch />;
  }

  return (
    <View style={sharedStyles.screenContainer}>
      <AboutCoin description={coinDetails?.description?.en} links={coinDetails?.links} />
    </View>
  );
};

export default AboutCoinScreen;
