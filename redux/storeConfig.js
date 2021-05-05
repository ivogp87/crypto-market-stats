import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './reducers/rootReducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));
export const persistor = persistStore(store);
