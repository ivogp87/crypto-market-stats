import { SET_SEARCH_QUERY } from '../actionTypes';

const setSearchQuery = (searchQuery) => ({ type: SET_SEARCH_QUERY, payload: searchQuery });

export default setSearchQuery;
