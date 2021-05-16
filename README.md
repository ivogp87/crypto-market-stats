Mobile app which shows statistics about the cryptocurrency market.

**Screenshots:** https://ivo.xyz/projects/crypto-stats

### Features

- View the price, market cap and price change for thousands of cryptocurrencies
- Sort the information by price, market cap, category
- Add cryptocurrencies to favorites
- View statistics for crypto exchanges
- Light and dark mode
- More features coming soon...

### Tech Stack

- React Native
- React Navigation
- Redux
- Redux Persist

### Theming

Minimal example:

**styles.js**

    const  themedStyles = (colors) =>  StyleSheet.create({
      container: {
    	backgroundColor:  colors.bgPrimary;
      }
    });

**MyComponent.js**

    import { useStyles } from  '../../hooks';
    import  themedStyles  from  './styles';

    const  MyComponent = () => {
      const  styles = useStyles(themedStyles);
        return (
          <View style={styles.container}>
            ...
          </View>
        )
    };

You can forward other props to the callback as well, for more advanced usage see [this component](https://github.com/ivogp87/crypto-market-stats/tree/main/components/AppText).

**How it works**

The app uses React Navigation's `NavigationContainer` as a theme provider (which uses Context under the hood). The _theme name_ is stored in the redux store and saved in AsyncStorage with Redux Persist.

A theme is a JS object containing the following properties: name (`string`), dark (`boolean`) and colors (`object`).
When creating a custom theme, you will need to provide all [properties required by React Navigation](https://reactnavigation.org/docs/themes) plus some additional colors. The themes are stored in [./styles/themes.js](https://github.com/ivogp87/crypto-market-stats/blob/main/styles/themes.js).

To access the **current theme** in any component you can use one of the following hooks:

**`useTheme`** - returns the whole theme object.

**`useColors`** - returns the colors object.

**`useStyles`** - accepts callback (style creator function) as a first argument and invokes it with the colors object and any other arguments passed to `useStyles`.
