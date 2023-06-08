import { createSlice } from "@reduxjs/toolkit";
import { IKanbanState } from "./kanban.types";

// const initialState: IKanbanState = {
//   kanbanBoards: {
//     byId: {},
//     allIds: [],
//   },
//   columns: {
//     byId: {},
//     allIds: [],
//   },
//   tasks: {
//     byId: {},
//     allIds: [],
//   },
// };

const initialState: IKanbanState = {
  kanbanBoards: {
    byId: {
      "1": {
        id: "1",
        title: "Platform Launch",
        columns: ["1", "2", "3", "4", "5"],
      },
      "2": {
        id: "2",
        title: "Marketing Plan",
        columns: ["6", "7", "8", "9", "10"],
      },
      "3": {
        id: "2",
        title: "Roadmap",
        columns: [],
      },
    },
    allIds: ["1", "2"],
  },
  columns: {
    byId: {
      "1": {
        id: "1",
        title: "Todo",
        tasks: ["1", "2"],
      },
      "2": {
        id: "2",
        title: "Doing",
        tasks: ["3"],
      },
      "3": {
        id: "3",
        title: "Done",
        tasks: ["4", "5", "6"],
      },
      "4": {
        id: "4",
        title: "In Progress",
        tasks: ["7"],
      },
      "5": {
        id: "5",
        title: "Review",
        tasks: ["8"],
      },
      "6": {
        id: "6",
        title: "Todo",
        tasks: ["9"],
      },
      "7": {
        id: "7",
        title: "Doing",
        tasks: ["10"],
      },
      "8": {
        id: "8",
        title: "Done",
        tasks: [],
      },
      "9": {
        id: "9",
        title: "In Progress",
        tasks: [],
      },
      "10": {
        id: "10",
        title: "Review",
        tasks: [],
      },
    },
    allIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  tasks: {
    byId: {
      "1": {
        id: "1",
        title: "Task 1",
        description: "Description of Task 1",
        subtasks: [{ name: "Subtask 1" }, { name: "Subtask 2" }],
        status: "In Progress",
      },
      "2": {
        id: "2",
        title: "Task 2",
        description: "Description of Task 2",
        subtasks: [],
        status: "Todo",
      },
      "3": {
        id: "3",
        title: "Task 3",
        description: "Description of Task 3",
        subtasks: [{ name: "Subtask 1" }],
        status: "Doing",
      },
      "4": {
        id: "4",
        title: "Task 4",
        description: "Description of Task 4",
        subtasks: [],
        status: "Review",
      },
      "5": {
        id: "5",
        title: "Task 5",
        description: "Description of Task 5",
        subtasks: [],
        status: "Review",
      },
      "6": {
        id: "6",
        title: "Task 6",
        description: "Description of Task 6",
        subtasks: [],
        status: "Review",
      },
      "7": {
        id: "7",
        title: "Task 7",
        description: "Description of Task 4",
        subtasks: [],
        status: "Review",
      },
      "8": {
        id: "8",
        title: "Task 8",
        description: "Description of Task 4",
        subtasks: [],
        status: "Review",
      },
      "9": {
        id: "9",
        title: "Task 9",
        description: "Description of Task 4",
        subtasks: [],
        status: "Review",
      },
      "10": {
        id: "10",
        title: "Task 10",
        description: "Description of Task 4",
        subtasks: [],
        status: "Review",
      },
    },
    allIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addKanbanBoard: (state, action) => {
      const kanbanBoard = action.payload;
      state.kanbanBoards.byId[kanbanBoard.id] = kanbanBoard;
      state.kanbanBoards.allIds.push(kanbanBoard.id);
    },
    addColumn: (state, action) => {
      const { kanbanBoardId, column } = action.payload;
      const kanbanBoard = state.kanbanBoards.byId[kanbanBoardId];
      kanbanBoard.columns.push(column.id);
      state.columns.byId[column.id] = column;
      state.columns.allIds.push(column.id);
    },
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      const column = state.columns.byId[columnId];
      column.tasks.push(task.id);
      state.tasks.byId[task.id] = task;
      state.tasks.allIds.push(task.id);
    },
    editTask: (state, action) => {
      const { task } = action.payload;
      state.tasks.byId[task.id] = task;
    },
  },
});

export const { addKanbanBoard, addColumn, addTask, editTask } =
  kanbanSlice.actions;
export default kanbanSlice.reducer;
