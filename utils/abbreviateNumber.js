import millify from 'millify';
import * as Localization from 'expo-localization';

// Converts number to human readable string
// abbreviateNumber(1100) => '1.1 K'
// abbreviateNumber('235700') => '235,7 K'
const abbreviateNumber = (number) => {
  // eslint-disable-next-line no-restricted-globals
  if (number === null || isNaN(number) || number > Number.MAX_SAFE_INTEGER) return 'n/a';

  return millify(Number(number), {
    space: true,
    units: ['', 'K', 'M', 'Bn', 'T'],
    decimalSeparator: Localization.decimalSeparator,
  });
};

export default abbreviateNumber;
