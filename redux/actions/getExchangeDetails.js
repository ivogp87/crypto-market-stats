import {
  EXCHANGE_DETAILS_REQUEST,
  EXCHANGE_DETAILS_SUCCESS,
  EXCHANGE_DETAILS_ERROR,
} from '../actionTypes';
import { fetchExchangeDetails } from '../../apis/coinGecko';

const exchangeDetailsRequest = () => ({ type: EXCHANGE_DETAILS_REQUEST });
const exchangeDetailsError = (error) => ({ type: EXCHANGE_DETAILS_ERROR, payload: error });
const exchangeDetailsSuccess = (exchangeId, exchangeDetails) => ({
  type: EXCHANGE_DETAILS_SUCCESS,
  payload: {
    exchangeId,
    exchangeDetails,
  },
});

const getExchangeDetails = (exchangeId) => async (dispatch) => {
  dispatch(exchangeDetailsRequest());

  try {
    const response = await fetchExchangeDetails(exchangeId);
    dispatch(exchangeDetailsSuccess(exchangeId, { ...response.data, lastUpdated: new Date() }));
  } catch (error) {
    dispatch(exchangeDetailsError(error));
  }
};

export default getExchangeDetails;
