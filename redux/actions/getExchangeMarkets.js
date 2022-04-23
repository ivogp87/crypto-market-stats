import {
  EXCHANGE_MARKETS_REQUEST,
  EXCHANGE_MARKETS_SUCCESS,
  EXCHANGE_MARKETS_ERROR,
} from '../actionTypes';
import { fetchExchangeMarkets } from '../../apis/coinGecko';

const exchangeMarketsRequest = () => ({ type: EXCHANGE_MARKETS_REQUEST });
const exchangeMarketsError = (error) => ({ type: EXCHANGE_MARKETS_ERROR, payload: error });
const exchangeDetailsSuccess = (exchangeId, exchangeMarkets) => ({
  type: EXCHANGE_MARKETS_SUCCESS,
  payload: {
    exchangeId,
    exchangeMarkets,
  },
});

const getExchangeMarkets = (exchangeId, page) => async (dispatch) => {
  dispatch(exchangeMarketsRequest());

  try {
    const response = await fetchExchangeMarkets(exchangeId, page);
    dispatch(exchangeDetailsSuccess(exchangeId, response.data.tickers));
  } catch (error) {
    dispatch(exchangeMarketsError(error));
  }
};

export default getExchangeMarkets;
