import { COIN_MARKETS_REQUEST, COIN_MARKETS_SUCCESS, COIN_MARKETS_ERROR } from '../actionTypes';
import { fetchCoinMarkets } from '../../apis/coinGecko';

const coinMarketsRequest = () => ({ type: COIN_MARKETS_REQUEST });
const coinMarketsError = (error) => ({ type: COIN_MARKETS_ERROR, payload: error });
const coinMarketsSuccess = (coinId, coinMarkets) => ({
  type: COIN_MARKETS_SUCCESS,
  payload: { coinId, coinMarkets },
});

const getCoinMarkets = (coinId, page = 1) => async (dispatch) => {
  dispatch(coinMarketsRequest());

  try {
    const response = await fetchCoinMarkets(coinId, page);
    dispatch(coinMarketsSuccess(coinId, { ...response.data, lastUpdated: new Date() }));
  } catch (error) {
    dispatch(coinMarketsError(error));
  }
};

export default getCoinMarkets;
