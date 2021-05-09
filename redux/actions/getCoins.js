import { COINS_REQUEST, COINS_ERROR, COINS_SUCCESS } from '../actionTypes';
import { fetchCoins } from '../../apis/coinGecko';

const coinsRequest = () => ({ type: COINS_REQUEST });
const coinsError = (error) => ({ type: COINS_ERROR, payload: error });
const coinsSuccess = (coinsList) => ({
  type: COINS_SUCCESS,
  payload: coinsList,
});

const getCoins = (
  referenceCurrency,
  orderBy,
  page = 1,
  includeSparkline,
  category,
  resultsPerPage = 100,
  priceChangePercentage = '1h,24h,7d'
) => async (dispatch) => {
  dispatch(coinsRequest());

  try {
    const response = await fetchCoins(
      referenceCurrency,
      orderBy,
      page,
      includeSparkline,
      category,
      resultsPerPage,
      priceChangePercentage
    );

    dispatch(coinsSuccess(response.data));
  } catch (error) {
    dispatch(coinsError(error));
  }
};

export default getCoins;
