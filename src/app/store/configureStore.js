import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducer/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

export const configureStore = (preloadedState) => {
  const middlewares = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancer = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancer);

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducer/rootReducer', () => {
        const newRootReducer = require('../reducer/rootReducer').default;
        store.replaceReducer(newRootReducer);
      })
    }
  }


  return store;
}