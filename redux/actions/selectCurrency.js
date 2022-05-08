import { SELECT_CURRENCY } from '../actionTypes';

const selectCurrency = (currency) => ({ type: SELECT_CURRENCY, payload: currency });

export default selectCurrency;
