const formatPercent = (number) => {
  if (!number && number !== 0) return 'n/a';
  const digits = Math.abs(number) < 0.01 ? 4 : 2;
  return `${number > 0 ? '+' : ''}${parseFloat(number.toFixed(digits))} %`;
};

export default formatPercent;
