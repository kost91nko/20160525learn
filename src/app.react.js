import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore  from './react-redux-saga/configureStore.js';
import Root from './react-redux-saga/components/Todo/Root.js';
import TodoApp from './react-flux/components/TodoApp.react.js';

class Simple extends React.Component{
  constructor(){
    super();
    console.log("Hey");
  }

  getDefaultProps() {
    return {
      foo: "foo"
    }
  };

  render() {
    return <div>I am here I am simple</div>
  }
}

const store = configureStore();

const renderTodos = () => render(
  <Root store={store} />
  ,document.getElementById('content')
);

const renderTodoAppFlux = () => render(
  <TodoApp />
  ,document.getElementById('content')
);


const renderSimple = () => render(
  <Simple />
  ,document.getElementById('content')
);

renderTodoAppFlux();
