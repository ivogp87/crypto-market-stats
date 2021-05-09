import { SET_SORTING_OPTION } from '../actionTypes';

const setSortingOption = (optionName, value) => ({
  type: SET_SORTING_OPTION,
  payload: {
    [optionName]: value,
  },
});

export default setSortingOption;
