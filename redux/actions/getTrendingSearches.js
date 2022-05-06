import {
  TRENDING_SEARCHES_REQUEST,
  TRENDING_SEARCHES_SUCCESS,
  TRENDING_SEARCHES_ERROR,
} from '../actionTypes';
import { fetchTrendingSearches } from '../../apis/coinGecko';

const trendingSearchesRequest = () => ({ type: TRENDING_SEARCHES_REQUEST });
const trendingSearchesError = (error) => ({ type: TRENDING_SEARCHES_ERROR, payload: error });
const trendingSearchesSuccess = (trendingSearches) => ({
  type: TRENDING_SEARCHES_SUCCESS,
  payload: trendingSearches,
});

const getTrendingSearches = () => async (dispatch) => {
  dispatch(trendingSearchesRequest());

  try {
    const { data } = await fetchTrendingSearches();
    const trendingSearches = {
      coins: data.coins.map((coin) => coin.item), // the data is inside item property
      exchanges: data.exchanges.map((exchange) => exchange.item),
      lastUpdated: new Date(),
    };
    dispatch(trendingSearchesSuccess(trendingSearches));
  } catch (error) {
    dispatch(trendingSearchesError(error));
  }
};

export default getTrendingSearches;
