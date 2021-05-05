import useTheme from './useTheme';

const useColors = () => {
  const { colors } = useTheme();

  return colors;
};

export default useColors;
