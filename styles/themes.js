const lightTheme = {
  name: 'light',
  dark: false,
  colors: {
    primary: '#4371B5',
    background: '#FFFFFF',
    text: '#020C1B',
    border: '#D9D9D9',
    card: '#F1F1F1',
    notification: '#FF0000',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F1F1F1',
    textPrimary: '#020C1B',
    textSecondary: '#274169',
    borderPrimary: '#E7E7E7',
    borderSecondary: '#D9D9D9',
    ripple: '#E5E5E5',
    info: '#4371B5',
    success: '#2BB02B',
    danger: '#FF0000',
    warning: '#DBDB00',
  },
};

const darkTheme = {
  name: 'dark',
  dark: true,
  colors: {
    primary: '#4C7ECF',
    background: '#020C1B',
    text: '#E5E5E5',
    border: '#113236',
    card: '#142136',
    notification: '#C62D22',
    bgPrimary: '#020C1B',
    bgSecondary: '#142136',
    textPrimary: '#E5E5E5',
    textSecondary: '#999999',
    borderPrimary: '#142136',
    borderSecondary: '#113236',
    ripple: '#17263E',
    info: '#4C7ECF',
    success: '#597022',
    warning: '#B0B007',
    danger: '#C62D22',
  },
};

const themes = [lightTheme, darkTheme];
export const themeNames = [...themes.map((theme) => theme.name)];

export default themes;
