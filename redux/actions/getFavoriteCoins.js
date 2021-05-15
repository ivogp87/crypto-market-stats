import {
  FAVORITE_COINS_REQUEST,
  FAVORITE_COINS_SUCCESS,
  FAVORITE_COINS_ERROR,
} from '../actionTypes';
import { fetchCoinsById } from '../../apis/coinGecko';

const favoriteCoinsRequest = () => ({ type: FAVORITE_COINS_REQUEST });
const favoriteCoinsError = (error) => ({ type: FAVORITE_COINS_ERROR, payload: error });
const favoriteCoinsSuccess = (coinsList) => ({ type: FAVORITE_COINS_SUCCESS, payload: coinsList });

const getFavoriteCoins = (
  coinIds,
  referenceCurrency,
  orderBy,
  includeSparkline,
  priceChangePercentage = '1h,24h,7d'
) => async (dispatch) => {
  dispatch(favoriteCoinsRequest());

  try {
    const response = await fetchCoinsById(
      coinIds,
      referenceCurrency,
      orderBy,
      includeSparkline,
      priceChangePercentage
    );

    dispatch(favoriteCoinsSuccess(response.data));
  } catch (error) {
    dispatch(favoriteCoinsError(error));
  }
};

export default getFavoriteCoins;
