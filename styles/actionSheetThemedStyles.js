const actionSheetThemedStyles = (colors, themeName, windowHeight) => ({
  userInterfaceStyle: themeName,
  tintColor: colors.textPrimary,
  showSeparators: true,
  titleTextStyle: { color: colors.textPrimary, fontWeight: 'bold' },
  containerStyle: {
    backgroundColor: colors.bgPrimary,
    maxHeight: windowHeight,
  },
  separatorStyle: { backgroundColor: colors.borderPrimary },
});

export default actionSheetThemedStyles;
