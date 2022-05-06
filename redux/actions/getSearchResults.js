import {
  SEARCH_RESULTS_REQUEST,
  SEARCH_RESULTS_SUCCESS,
  SEARCH_RESULTS_ERROR,
} from '../actionTypes';
import { fetchSearchResults } from '../../apis/coinGecko';

const searchResultsRequest = () => ({ type: SEARCH_RESULTS_REQUEST });
const searchResultsError = (error) => ({ type: SEARCH_RESULTS_ERROR, payload: error });
const searchResultsSuccess = (searchResults) => ({
  type: SEARCH_RESULTS_SUCCESS,
  payload: searchResults,
});

const getSearchResults = (searchQuery) => async (dispatch) => {
  dispatch(searchResultsRequest());

  try {
    const { data } = await fetchSearchResults(searchQuery);
    dispatch(searchResultsSuccess(data));
  } catch (error) {
    dispatch(searchResultsError(error));
  }
};

export default getSearchResults;
