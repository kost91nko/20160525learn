import React from 'react';
import TodoItem from './TodoItem.react';

const MainSection = ({
  allTodos,
  areAllComplete,
}) => {
  const todos = [];

  for (var key in allTodos) {
    todos.push(<TodoItem key={key} todo={allTodos[key]} />);
  }

  return (
    <section id="main">
      <ul id="todo-list">{todos}</ul>
    </section>
  );
};

export default MainSection;

