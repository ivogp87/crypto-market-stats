import {
  COIN_MARKETS_NEXT_PAGE_REQUEST,
  COIN_MARKETS_NEXT_PAGE_SUCCESS,
  COIN_MARKETS_NEXT_PAGE_ERROR,
} from '../actionTypes';
import { fetchCoinMarkets } from '../../apis/coinGecko';

const coinMarketsRequest = () => ({ type: COIN_MARKETS_NEXT_PAGE_REQUEST });
const coinMarketsError = (error) => ({ type: COIN_MARKETS_NEXT_PAGE_ERROR, payload: error });
const coinMarketsSuccess = (coinId, coinMarkets) => ({
  type: COIN_MARKETS_NEXT_PAGE_SUCCESS,
  payload: { coinId, coinMarkets },
});

const getCoinMarketsNextPage = (coinId, page) => async (dispatch) => {
  dispatch(coinMarketsRequest());

  try {
    const response = await fetchCoinMarkets(coinId, page);
    dispatch(coinMarketsSuccess(coinId, { ...response.data, lastUpdated: new Date() }));
  } catch (error) {
    dispatch(coinMarketsError(error));
  }
};

export default getCoinMarketsNextPage;
