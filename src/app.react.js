import React from 'react';
import {render} from 'react-dom';
import CommentBox from './react/Comments/CommentBox.js';
import FilterableProductTable from './react/FilterableProductTable/FilterableProductTable.js'
import TodoList from './react/TodoList/TodoList.js';
import { counterStore } from './react/store.js';

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onCLick={onDecrement}>-</button>
  </div>
);

render(
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
  />,
  document.getElementById('content')
);
