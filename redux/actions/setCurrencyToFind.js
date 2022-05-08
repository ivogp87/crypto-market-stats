import { CURRENCY_TO_FIND } from '../actionTypes';

const setCurrencyToFind = (string) => ({ type: CURRENCY_TO_FIND, payload: string });

export default setCurrencyToFind;
