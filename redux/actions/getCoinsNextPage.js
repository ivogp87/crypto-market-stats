import {
  COINS_NEXT_PAGE_REQUEST,
  COINS_NEXT_PAGE_SUCCESS,
  COINS_NEXT_PAGE_ERROR,
} from '../actionTypes';
import { fetchCoins } from '../../apis/coinGecko';

const coinsRequest = () => ({ type: COINS_NEXT_PAGE_REQUEST });
const coinsError = (error) => ({ type: COINS_NEXT_PAGE_ERROR, payload: error });
const coinsSuccess = (coinsList) => ({
  type: COINS_NEXT_PAGE_SUCCESS,
  payload: coinsList,
});

const getCoinsNextPage = (
  referenceCurrency,
  orderBy,
  page,
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

export default getCoinsNextPage;
