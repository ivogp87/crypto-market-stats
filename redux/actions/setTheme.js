import { SET_THEME } from '../actionTypes';

const setTheme = (themeName, useDeviceTheme) => ({
  type: SET_THEME,
  payload: { name: themeName, useDeviceTheme },
});

export default setTheme;
