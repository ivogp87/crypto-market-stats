const getCandlestickChartData = (chartData) => {
  if (Array.isArray(chartData) && chartData.length) {
    return chartData.map(([date, open, high, low, close]) => ({
      x: date,
      open,
      close,
      high,
      low,
    }));
  }

  return null;
};

export default getCandlestickChartData;
