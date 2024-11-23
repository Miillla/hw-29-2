import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
  },
  reducers: {
    addTodoList: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addTodoList } = todosSlice.actions;

export default todosSlice.reducer;
