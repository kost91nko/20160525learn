import React from 'react';
import AddTodo from './AddTodo.js';
import Footer from './Footer.js';
import VisibleTodoList from './VisibleTodoList.js';


const TodoApp = ({filter}) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={filter}/>
    <Footer />
  </div>
);

export default TodoApp;
