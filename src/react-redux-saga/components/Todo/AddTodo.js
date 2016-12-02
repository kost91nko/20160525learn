import React from 'react';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';
import { normalize } from 'normalizr';
import * as api from "../../api";
import * as schema from "../../api/schema.js";

let nextTodoId = 0;

const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    });
  })

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input
        ref={ node => {
          input = node;
        }}
      />

      <button onClick={ () => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect()(AddTodo);


export default AddTodo;
