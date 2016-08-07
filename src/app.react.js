import React from 'react';
import {render} from 'react-dom';
import CommentBox from './react/Comments/CommentBox.js';
import FilterableProductTable from './react/FilterableProductTable/FilterableProductTable.js'
import TodoList from './react/TodoList/TodoList.js';
import counterStore from './react/store.js';
import DevTools from './react/DevTools/DevTools.js';
import { Provider } from 'react-redux';

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const renderApp = () => render(
  <Provider store={counterStore}>
    <div>
    <Counter
      value={counterStore.getState()}
      onIncrement = {() =>
        counterStore.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement = {() =>
        counterStore.dispatch({
          type: 'DECREMENT'
        })
      }
    />
    <DevTools />
    </div>
  </Provider>
  ,document.getElementById('content')
);

counterStore.subscribe(renderApp);
renderApp();
