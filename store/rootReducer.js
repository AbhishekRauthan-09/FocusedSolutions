import { combineReducers } from '@reduxjs/toolkit';
import { todosReducer } from './todos/reducer';

const reducer = combineReducers({
  todos: todosReducer,
});

export const rootReducer = (state, action) => {
  // console.log('state', action.type);
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return reducer(state, action);
};
