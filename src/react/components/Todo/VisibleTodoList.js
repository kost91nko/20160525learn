import TodoList from './TodoList.js';
import { connect } from 'react-redux';
import { normalize } from 'normalizr';
import React, { Component } from 'react';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../../reducers';
import * as api from '../../api';
import * as schema from '../../api/schema.js';
import FetchError from './FetchError.js';

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

const fetchTodos = (filter) => (dispatch, getState) => {
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

class VisibleTodoList extends Component {

  componentDidMount(){
    this.fetchData();
  }

  componentDidUpdate(prevProps){
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter).then(() => console.log("done!"));
  }

  render() {
    const { onTodoClick, todos, isFetching, errorMessage } = this.props;

    if (isFetching && !todos.length){
      return <p>Loading...</p>
    }

    if (errorMessage && !todos.length){
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }

    return (
      <TodoList
        todos={todos}
        onTodoClick={onTodoClick}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.filter || 'all';
  return {
    todos: getVisibleTodos(state,filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state,filter),
    filter,
  }
};

// const mapDispatchToTodoListProps = (dispatch) => ({
//   onTodoClick: (id) => {
//     dispatch(toggleTodo(id));
//   },
// });

VisibleTodoList = connect(
  mapStateToProps,
  { onTodoClick: toggleTodo, fetchTodos },
)(VisibleTodoList);

export default VisibleTodoList;
