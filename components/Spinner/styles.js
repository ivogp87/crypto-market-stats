import { StyleSheet } from 'react-native';
import { spacing } from '../../styles';

const styles = StyleSheet.create({
  spinner: { padding: spacing.small },

  spinnerStretched: {
    width: '100%',
    zIndex: 100,
    position: 'absolute',
    top: '45%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
});

export default styles;
