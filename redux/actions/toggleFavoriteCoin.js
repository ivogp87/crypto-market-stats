import { TOGGLE_FAVORITE_COIN } from '../actionTypes';

const toggleFavoriteCoin = (coinId) => ({
  type: TOGGLE_FAVORITE_COIN,
  payload: coinId,
});

export default toggleFavoriteCoin;
