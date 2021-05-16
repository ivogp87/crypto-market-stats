import {
  EXCHANGES_NEXT_PAGE_REQUEST,
  EXCHANGES_NEXT_PAGE_SUCCESS,
  EXCHANGES_NEXT_PAGE_ERROR,
} from '../actionTypes';
import { fetchExchanges } from '../../apis/coinGecko';

const exchangesRequest = () => ({ type: EXCHANGES_NEXT_PAGE_REQUEST });
const exchangesError = (error) => ({ type: EXCHANGES_NEXT_PAGE_ERROR, payload: error });
const exchangesSuccess = (exchangesData) => ({
  type: EXCHANGES_NEXT_PAGE_SUCCESS,
  payload: exchangesData,
});

const getExchangesNextPage = (page, resultsPerPage = 100) => async (dispatch) => {
  dispatch(exchangesRequest());

  try {
    const response = await fetchExchanges(page, resultsPerPage);
    dispatch(exchangesSuccess(response.data));
  } catch (error) {
    dispatch(exchangesError(error));
  }
};

export default getExchangesNextPage;
