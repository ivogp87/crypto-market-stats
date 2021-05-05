import {
  COIN_LIST_REQUEST,
  COIN_LIST_ERROR,
  COIN_LIST_SUCCESS,
  COIN_LIST_LOAD_MORE,
} from '../actionTypes';
import { fetchCoinList } from '../../apis/coinGecko';

const coinListRequest = () => ({ type: COIN_LIST_REQUEST });
const coinListError = (error) => ({ type: COIN_LIST_ERROR, payload: error });
const coinListSuccess = (coinList) => ({
  type: COIN_LIST_SUCCESS,
  payload: coinList,
});
const coinListLoadMore = (coinList) => ({
  type: COIN_LIST_LOAD_MORE,
  payload: coinList,
});

const getCoinList = (
  referenceCurrency,
  orderBy,
  page = 1,
  includeSparkline = true,
  category,
  resultsPerPage = 100,
  priceChangePercentage = '1h,24h,7d'
) => async (dispatch) => {
  dispatch(coinListRequest());

  try {
    const response = await fetchCoinList(
      referenceCurrency,
      orderBy,
      page,
      includeSparkline,
      category,
      resultsPerPage,
      priceChangePercentage
    );

    dispatch(coinListSuccess(response.data));
  } catch (error) {
    dispatch(coinListError(error));
  }
};

export const getCoinListNextPage = (
  referenceCurrency,
  orderBy,
  page,
  includeSparkline = true,
  category,
  resultsPerPage = 100,
  priceChangePercentage = '1h,24h,7d'
) => async (dispatch) => {
  dispatch(coinListRequest());

  try {
    const response = await fetchCoinList(
      referenceCurrency,
      orderBy,
      page,
      includeSparkline,
      category,
      resultsPerPage,
      priceChangePercentage
    );

    dispatch(coinListLoadMore(response.data));
  } catch (error) {
    dispatch(coinListError(error));
  }
};

export default getCoinList;
