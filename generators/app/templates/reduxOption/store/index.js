import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import thunk from 'redux-thunk';

// router
import history from './history';
import { routerMiddleware } from 'connected-react-router/immutable';

// middlewares
import persistState from 'redux-localstorage';

//helpers
import getLocalStorageConfig from 'services/localstorage';
import rootReducer from 'reducers';

// constants
import LOCAL_STORAGE_CONFIG from 'constants/localstorage';

const initialState = Map();

const enhancers = [persistState(['token'], getLocalStorageConfig(LOCAL_STORAGE_CONFIG))];
const middleware = [
  routerMiddleware(history),
  thunk
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  installDevTools(Immutable);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer(history),
  initialState,
  composedEnhancers,
);

export default store;
