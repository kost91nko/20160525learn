import { createStore, applyMiddleware, compose  } from 'redux';
import DevTools from './DevTools/DevTools.js';

const counter = (state = 0, action) =>{
  switch (action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const enhancer = compose(
  // Middleware you want to use in development:
  //applyMiddleware(d1, d2, d3),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

const coutnerStore = createStore(counter, enhancer);
export default coutnerStore;
