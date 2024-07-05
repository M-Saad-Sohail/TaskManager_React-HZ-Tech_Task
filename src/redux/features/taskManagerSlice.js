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
    updateTask: (state, action) => {
      const { userId, task } = action.payload;
      if (state.tasks[userId]) {
        const index = state.tasks[userId].findIndex((t) => t.id === task.id);
        if (index !== -1) {
          state.tasks[userId][index] = task;
        }
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = taskManagerSlice.actions;
export default taskManagerSlice.reducer;
