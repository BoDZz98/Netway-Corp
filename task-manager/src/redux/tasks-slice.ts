import { createSlice } from "@reduxjs/toolkit";
import { taskObj } from "../../types";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "",
      priority: "",
      completed: false,
    },
  ],
  filter: "ALL", // Can be 'ALL', 'COMPLETED', 'INCOMPLETE'
  priorityFilter: "ALL", // Can be 'ALL', 'HIGH', 'MEDIUM', 'LOW'
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const newTask = action.payload as taskObj;

      const oldTask = state.tasks.find((task) => task.id === newTask.id);
      if (oldTask) {
        oldTask.title = newTask.title;
        oldTask.priority = newTask.priority;
        oldTask.completed = newTask.completed;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
  },
});

export const taskAction = tasksSlice.actions;
export default tasksSlice;
