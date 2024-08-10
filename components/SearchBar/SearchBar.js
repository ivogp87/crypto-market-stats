import React, { useRef, useEffect } from 'react';
import { Animated, Easing, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import themedStyles from './styles';
import { useStyles, useColors } from '../../hooks';

const SearchBar = ({
  text,
  placeholder = 'Search',
  isSearching,
  onChangeText,
  onSubmitEditing,
  onClear,
}) => {
  const styles = useStyles(themedStyles);
  const colors = useColors();

  const spinAnimation = useRef(new Animated.Value(0)).current;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    if (isSearching) {
      animation.start();
      return () => animation.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching]);

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.searchBar}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="search"
        autoCorrect={false}
        onSubmitEditing={onSubmitEditing}
        style={styles.textInput}
        placeholderTextColor={colors.textPrimary}
      />
      {!!text && !isSearching && (
        <Ionicons name="close" size={16} color={colors.textPrimary} onPress={onClear} />
      )}
      {isSearching && (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <AntDesign name="loading1" size={12} color={colors.textPrimary} />
        </Animated.View>
      )}
    </View>
  );
};

SearchBar.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isSearching: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default SearchBar;
