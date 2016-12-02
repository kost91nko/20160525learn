import TodoList from './TodoList.js';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../../reducers';
import FetchError from './FetchError.js';
import { toggleTodo, fetchTodos, requestTodos} from '../../actions';



class VisibleTodoList extends Component {
  constructor(){
    super();
    console.log("Hello");
  }

  componentDidMount(){
    this.fetchData();
  }

  componentDidUpdate(prevProps){
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos, requestTodos } = this.props;
    requestTodos(filter);
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
  { onTodoClick: toggleTodo, fetchTodos, requestTodos },
)(VisibleTodoList);

export default VisibleTodoList;
