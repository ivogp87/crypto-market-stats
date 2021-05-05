import useTheme from './useTheme';

const useStyles = (callbackOrStyles) => {
  const { colors } = useTheme();
  return typeof callbackOrStyles === 'function' ? callbackOrStyles(colors) : callbackOrStyles;
};

export default useStyles;
