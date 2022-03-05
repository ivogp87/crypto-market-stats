const getLineChartData = (chartData, chartType) => {
  if (!chartData) return null;

  switch (chartType) {
    case 'market cap':
      return chartData?.market_caps?.map((item) => ({ x: item[0], y: item[1] }));
    case 'volume':
      return chartData?.total_volumes?.map((item) => ({ x: item[0], y: item[1] }));
    default:
      return chartData?.prices?.map((item) => ({ x: item[0], y: item[1] }));
  }
};

export default getLineChartData;
