import { createSlice } from "@reduxjs/toolkit";

const taskManagerSlice = createSlice({
  name: "taskManager",
  initialState: {
    tasks: {},
  },
  reducers: {
    addTask(state, action) {
      const { userId, task } = action.payload;
      if (!state.tasks[userId]) {
        state.tasks[userId] = [];
      }
      state.tasks[userId].unshift(task);
    },
    removeTask(state, action) {
      const { userId, taskId } = action.payload;
      if (state.tasks[userId]) {
        state.tasks[userId] = state.tasks[userId].filter(task => task.id !== taskId);
      }
    },
    updateTask(state, action) {
      const { userId, task } = action.payload;
      if (state.tasks[userId]) {
        const taskIndex = state.tasks[userId].findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          state.tasks[userId][taskIndex] = task;
        }
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = taskManagerSlice.actions;
export default taskManagerSlice.reducer;
