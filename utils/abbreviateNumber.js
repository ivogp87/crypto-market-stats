import millify from 'millify';
import * as Localization from 'expo-localization';

// Converts number to human readable string
// abbreviateNumber(1100) => '1.1 K'
// abbreviateNumber('235700') => '235,7 K'
const abbreviateNumber = (number) => {
  if (number === null) return 'n/a';

  return millify(Number(number), {
    space: true,
    units: ['', 'K', 'M', 'Bn', 'T'],
    decimalSeparator: Localization.decimalSeparator,
  });
};

export default abbreviateNumber;
