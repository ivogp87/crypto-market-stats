import { StyleSheet } from 'react-native';
import { spacing } from '../../styles';

const containerStyles = {
  padding: spacing.medium,
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    ...containerStyles,
  },

  stretchedContainer: {
    flex: 1,
    justifyContent: 'center',
    ...containerStyles,
  },

  childrenContainer: {
    marginTop: spacing.medium,
    alignSelf: 'stretch',
  },
});

export default styles;
