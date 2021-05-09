import useTheme from './useTheme';

const useStyles = (callbackOrStyles, ...props) => {
  const { colors } = useTheme();
  return typeof callbackOrStyles === 'function'
    ? callbackOrStyles(colors, ...props)
    : callbackOrStyles;
};

export default useStyles;
