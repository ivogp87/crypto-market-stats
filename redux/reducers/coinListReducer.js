import {
  COIN_LIST_REQUEST,
  COIN_LIST_ERROR,
  COIN_LIST_SUCCESS,
  COIN_LIST_LOAD_MORE,
} from '../actionTypes';

const initialState = {
  status: 'idle',
  error: null,
  coinList: null,
};

const coinListReducer = (state = initialState, action) => {
  switch (action.type) {
    case COIN_LIST_REQUEST:
      return { ...state, status: 'loading', error: null };
    case COIN_LIST_SUCCESS:
      return { ...state, status: 'idle', coinList: action.payload };
    case COIN_LIST_LOAD_MORE:
      return { ...state, status: 'idle', coinList: [...state.coinList, ...action.payload] };
    case COIN_LIST_ERROR:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

export default coinListReducer;
