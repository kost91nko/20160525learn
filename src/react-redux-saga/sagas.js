import { normalize } from 'normalizr';
import { call, put, take, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as api from './api';
import { getVisibleTodos, getErrorMessage, getIsFetching } from './reducers';
import * as schema from './api/schema.js';

function* fetchTodos({filter}) {
  try{
    const data = yield call(api.fetchTodos, filter);
    yield put({
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response: normalize(data, schema.arrayOfTodos),
    })
  } catch (error) {
    yield put ({
      type: 'FETCH_TODOS_FAILURE',
      filter,
      message: error.message || 'Something went wrong'
    })
  }
}

export default function* rootSaga() {
  yield takeEvery('FETCH_TODOS_REQUEST', fetchTodos)
}
