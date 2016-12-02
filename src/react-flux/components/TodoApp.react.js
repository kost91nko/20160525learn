import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import React from 'react';
import TodoStore from '../stores/TodoStore';

function getTodoState() {
  const allTodos = TodoStore.getAll();
  return {
    allTodos,
    areAllComplete: Object.entries(allTodos).every(([key, value]) => value.complete)
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTodoState());
  }

});

export default TodoApp;
