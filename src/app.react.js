import React from 'react';
import {render} from 'react-dom';
import configureStore  from './react/configureStore.js';
import Root from './react/components/Todo/Root.js';

const store = configureStore();

const renderTodos = () => render(
  <Root store={store} />
  ,document.getElementById('content')
);

renderTodos();
