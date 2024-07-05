import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {},
};

export const taskManagerSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { userId, task } = action.payload;
      if (!state.tasks[userId]) {
        state.tasks[userId] = [];
      }
      state.tasks[userId].push(task);
    },
    removeTask: (state, action) => {
      const { userId, taskId } = action.payload;
      if (state.tasks[userId]) {
        state.tasks[userId] = state.tasks[userId].filter(
          (task) => task.id !== taskId
        );
      }
    },
  },
});

export const { addTask, removeTask } = taskManagerSlice.actions;
export default taskManagerSlice.reducer;
