import { themeNames } from '../../styles/themes';

const initialState = {
  theme: {
    name: themeNames[0],
    useDeviceTheme: true,
  },
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default settingsReducer;
