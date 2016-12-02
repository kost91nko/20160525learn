import { normalize } from 'normalizr';
import * as api from './api';
import { getVisibleTodos, getErrorMessage, getIsFetching } from './reducers';
import * as schema from './api/schema.js';

export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(response =>  {
    dispatch({
      type: 'TOGGLE_TODO',
      response: normalize(response, schema.todo),
    })
  });

export const requestTodos = (filter) => ({
  type: "FETCH_TODOS_REQUEST",
  filter
});

export const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetching(getState(), filter)){
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });

  return api.fetchTodos(filter).then(
    response => {
      console.log(
        'normalized response',
      );
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(response, schema.arrayOfTodos),
      })
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong'
      })
    }
  );
};
