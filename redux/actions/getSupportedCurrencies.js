import {
  SUPPORTED_CURRENCIES_REQUEST,
  SUPPORTED_CURRENCIES_SUCCESS,
  SUPPORTED_CURRENCIES_ERROR,
} from '../actionTypes';

import { fetchSupportedCurrencies } from '../../apis/coinGecko';

const supportedCurrenciesRequest = () => ({ type: SUPPORTED_CURRENCIES_REQUEST });
const supportedCurrenciesError = (error) => ({ type: SUPPORTED_CURRENCIES_ERROR, payload: error });
const supportedCurrenciesSuccess = (supportedCurrencies) => ({
  type: SUPPORTED_CURRENCIES_SUCCESS,
  payload: supportedCurrencies,
});

const getSupportedCurrencies = () => async (dispatch) => {
  dispatch(supportedCurrenciesRequest());

  try {
    const { data } = await fetchSupportedCurrencies();
    dispatch(supportedCurrenciesSuccess(data));
  } catch (error) {
    dispatch(supportedCurrenciesError(error));
  }
};

export default getSupportedCurrencies;
