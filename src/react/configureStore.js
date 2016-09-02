import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from './components/DevTools/DevTools.js';
import todoApp from './reducers';

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production'){
    middlewares.push(createLogger());
  }

  const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(...middlewares),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  );

  return  createStore(todoApp, enhancer);
};

export default configureStore;
