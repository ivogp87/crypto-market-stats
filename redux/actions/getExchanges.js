import { EXCHANGES_REQUEST, EXCHANGES_SUCCESS, EXCHANGES_ERROR } from '../actionTypes';
import { fetchExchanges } from '../../apis/coinGecko';

const exchangesRequest = () => ({ type: EXCHANGES_REQUEST });
const exchangesError = (error) => ({ type: EXCHANGES_ERROR, payload: error });
const exchangesSuccess = (exchangesData) => ({ type: EXCHANGES_SUCCESS, payload: exchangesData });

const getExchanges = (page = 1, resultsPerPage = 100) => async (dispatch) => {
  dispatch(exchangesRequest());

  try {
    const response = await fetchExchanges(page, resultsPerPage);
    dispatch(exchangesSuccess(response.data));
  } catch (error) {
    dispatch(exchangesError(error));
  }
};

export default getExchanges;
