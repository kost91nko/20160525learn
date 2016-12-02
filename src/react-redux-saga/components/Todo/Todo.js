import React from 'react';
import s from './Todo.scss';

const Todo = ({
  onClick,
  completed,
  text,
}) => (
  <li
    onClick = { onClick }
    className = { completed
      ? s.completed
      : s.nonCompleted
    }
  >
    {text}
  </li>
);

export default Todo;
