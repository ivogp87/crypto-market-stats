const shouldUpdate = (lastUpdated, updateInterval) => {
  if (!lastUpdated) {
    return true;
  }

  if (!updateInterval) {
    return false;
  }

  return new Date(lastUpdated).getTime() + updateInterval < Date.now();
};

export default shouldUpdate;
