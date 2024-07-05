import { createSlice } from "@reduxjs/toolkit";

const initialState = {
//   tasks: [{ id: 1, task: "Hello world!", deadline: "2024-07-05" }],
  tasks: [],
};

export const taskManagerSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = action.payload;
      state.tasks.push(task);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = taskManagerSlice.actions;
export default taskManagerSlice.reducer;
