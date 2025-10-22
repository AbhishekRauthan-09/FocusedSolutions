import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    dailyTodos: ["asdifh", "asdfoh"],
};

const reducers = {
    setDailyTodos: (state, action) => {
        state.dailyTodos = action.payload;
    }
};

const todoSlice = createSlice({
  name: 'todos',
  reducers,
  initialState: INITIAL_STATE,
});
    
export const { setDailyTodos } = todoSlice.actions;
export const todosReducer = todoSlice.reducer;