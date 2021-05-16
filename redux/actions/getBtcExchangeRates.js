import {
  BTC_EXCHANGE_RATES_REQUEST,
  BTC_EXCHANGE_RATES_SUCCESS,
  BTC_EXCHANGE_RATES_ERROR,
} from '../actionTypes';
import { fetchBtcExchangeRates } from '../../apis/coinGecko';

const btcExchangeRatesRequest = () => ({ type: BTC_EXCHANGE_RATES_REQUEST });
const btcExchangeRatesError = (error) => ({ type: BTC_EXCHANGE_RATES_ERROR, payload: error });
const btcExchangeRatesSuccess = (exchangeRates) => ({
  type: BTC_EXCHANGE_RATES_SUCCESS,
  payload: exchangeRates,
});

const getBtcExchangeRates = () => async (dispatch) => {
  dispatch(btcExchangeRatesRequest());
  try {
    const response = await fetchBtcExchangeRates();
    dispatch(btcExchangeRatesSuccess(response.data.rates));
  } catch (error) {
    dispatch(btcExchangeRatesError(error));
  }
};

export default getBtcExchangeRates;
