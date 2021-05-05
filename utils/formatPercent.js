const formatPercent = (number) => {
  if (number === null) return 'n/a';

  return `${number > 0 ? '+' : ''}${number.toPrecision(2)} %`;
};

export default formatPercent;
