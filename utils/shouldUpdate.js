const shouldUpdate = (lastUpdated, updateInterval) =>
  lastUpdated && updateInterval
    ? new Date(lastUpdated).getTime() + updateInterval < Date.now()
    : false;

export default shouldUpdate;
