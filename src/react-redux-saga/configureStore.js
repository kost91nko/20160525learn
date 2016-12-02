import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import DevTools from './components/DevTools/DevTools.js';
import todoApp from './reducers';
import sagas from './sagas';

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production'){
    middlewares.push(createLogger());
  }
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(...middlewares),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  );

  let store = createStore(todoApp, enhancer);
  sagaMiddleware.run(sagas);

  return store;
};

export default configureStore;
