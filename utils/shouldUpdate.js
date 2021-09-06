const shouldUpdate = (lastUpdated, updateInterval) =>
  new Date(lastUpdated).getTime() + updateInterval < Date.now();

export default shouldUpdate;
