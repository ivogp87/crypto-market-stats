import { StyleSheet } from 'react-native';

const themedStyles = (_colors, width, height) =>
  StyleSheet.create({
    chartSize: {
      width,
      height,
    },
  });

export default themedStyles;
