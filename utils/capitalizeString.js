const capitalizeString = (string) => {
  if (!string || typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default capitalizeString;
