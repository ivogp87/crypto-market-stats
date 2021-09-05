import { COIN_DETAILS_REQUEST, COIN_DETAILS_SUCCESS, COIN_DETAILS_ERROR } from '../actionTypes';
import { fetchCoinDetails } from '../../apis/coinGecko';

const coinDetailsRequest = () => ({ type: COIN_DETAILS_REQUEST });
const coinDetailsError = (error) => ({ type: COIN_DETAILS_ERROR, payload: error });
const coinDetailsSuccess = (coinId, coinDetails) => ({
  type: COIN_DETAILS_SUCCESS,
  payload: {
    coinId,
    coinDetails,
  },
});

const getCoinDetails = (coinId) => async (dispatch) => {
  dispatch(coinDetailsRequest());

  try {
    const response = await fetchCoinDetails(coinId);
    dispatch(coinDetailsSuccess(coinId, { ...response.data, lastUpdated: new Date() }));
  } catch (error) {
    dispatch(coinDetailsError(error));
  }
};

export default getCoinDetails;
