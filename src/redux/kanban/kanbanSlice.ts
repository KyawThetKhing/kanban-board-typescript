import { createSlice } from "@reduxjs/toolkit";
import { IKanbanState } from "./kanban.types";

const initialState: IKanbanState = {
  kanbanBoards: {
    byId: {
      "1": {
        id: "1",
        title: "Platform Launch",
        columns: [
          "1awawawawsdfs",
          "4sdfdsfjwe",
          "5sdfsdfsdfdsf",
          "2sdfsdfsdfsd",
          "3dfkseslkwek",
        ],
      },
      "2": {
        id: "2",
        title: "Marketing Plan",
        columns: ["6", "9", "10", "7", "8"],
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
      "1awawawawsdfs": {
        id: "1awawawawsdfs",
        title: "Todo",
        tasks: ["1", "2"],
      },
      "2sdfsdfsdfsd": {
        id: "2sdfsdfsdfsd",
        title: "Testing",
        tasks: ["3"],
      },
      "4sdfdsfjwe": {
        id: "4sdfdsfjwe",
        title: "In Progress",
        tasks: ["7"],
      },
      "5sdfsdfsdfdsf": {
        id: "5sdfsdfsdfdsf",
        title: "Review",
        tasks: ["8"],
      },
      "3dfkseslkwek": {
        id: "3dfkseslkwek",
        title: "Done",
        tasks: ["4", "5", "6"],
      },
      "6": {
        id: "6",
        title: "Todo",
        tasks: ["9"],
      },
      "7": {
        id: "7",
        title: "Testing",
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
        subtasks: [
          { id: "1", name: "Subtask 1", status: "Done" },
          { id: "2", name: "Subtask 2", status: "Not Done" },
        ],
        status: "In Progress",
      },
      "2": {
        id: "2",
        title: "Task 2",
        description: "Description of Task 2",
        subtasks: [
          { id: "3", name: "Subtask 1", status: "Done" },
          { id: "4", name: "Subtask 2", status: "Not Done" },
          { id: "5", name: "Subtask 3", status: "Not Done" },
        ],
        status: "Todo",
      },
      "3": {
        id: "3",
        title: "Task 3",
        description: "Description of Task 3",
        subtasks: [
          { id: "6", name: "Subtask 1", status: "Not Done" },
          { id: "7", name: "Subtask 2", status: "Not Done" },
          { id: "8", name: "Subtask 3", status: "Not Done" },
        ],
        status: "Testing",
      },
      "4": {
        id: "4",
        title: "Task 4",
        description: "Description of Task 4",
        subtasks: [
          { id: "9", name: "Subtask 1", status: "Done" },
          { id: "10", name: "Subtask 2", status: "Done" },
          { id: "11", name: "Subtask 3", status: "Not Done" },
        ],
        status: "Review",
      },
      "5": {
        id: "5",
        title: "Task 5",
        description: "Description of Task 5",
        subtasks: [
          { id: "12", name: "Subtask 1", status: "Done" },
          { id: "13", name: "Subtask 2", status: "Not Done" },
          { id: "14", name: "Subtask 3", status: "Not Done" },
          { id: "15", name: "Subtask 4", status: "Not Done" },
        ],
        status: "Review",
      },
      "6": {
        id: "6",
        title: "Task 6",
        description: "Description of Task 6",
        subtasks: [
          { id: "16", name: "Subtask 1", status: "Done" },
          { id: "17", name: "Subtask 2", status: "Not Done" },
          { id: "18", name: "Subtask 3", status: "Not Done" },
          { id: "19", name: "Subtask 4", status: "Done" },
        ],
        status: "Review",
      },
      "7": {
        id: "7",
        title: "Task 7",
        description: "Description of Task 4",
        subtasks: [
          { id: "20", name: "Subtask 1", status: "Done" },
          { id: "21", name: "Subtask 2", status: "Not Done" },
        ],
        status: "Review",
      },
      "8": {
        id: "8",
        title: "Task 8",
        description: "Description of Task 4",
        subtasks: [
          { id: "22", name: "Subtask 1", status: "Done" },
          { id: "23", name: "Subtask 2", status: "Not Done" },
        ],
        status: "Review",
      },
      "9": {
        id: "9",
        title: "Task 9",
        description: "Description of Task 4",
        subtasks: [
          { id: "24", name: "Subtask 1", status: "Done" },
          { id: "25", name: "Subtask 2", status: "Not Done" },
        ],
        status: "Review",
      },
      "10": {
        id: "10",
        title: "Task 10",
        description: "Description of Task 4",
        subtasks: [
          { id: "26", name: "Subtask 1", status: "Done" },
          { id: "27", name: "Subtask 2", status: "Not Done" },
        ],
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
      state.tasks.byId[task.id] = { ...state.tasks.byId[task.id], ...task };
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      //delete task from task List
      delete state.tasks.byId[id];

      //delete task Id from all Ids
      state.tasks.allIds = state.tasks.allIds.filter((taskId) => taskId !== id);
      //delte taskid from column tasks
      Object.values(state.columns.byId).forEach((column) => {
        column.tasks = column.tasks.filter((taskId) => taskId !== id);
      });
    },
    updateTaskStatus: (state, action) => {
      const { sourceColumnId, destinationColumnId, taskId } = action.payload;

      const task = state.tasks.byId[taskId];
      const sourceColumn = state.columns.byId[sourceColumnId];
      const destinationColumn = state.columns.byId[destinationColumnId];

      if (task && sourceColumn && destinationColumn) {
        sourceColumn.tasks = sourceColumn.tasks.filter((id) => id !== taskId);
        destinationColumn.tasks.push(taskId);
        task.status = destinationColumn.title;
      }
    },
  },
});

export const {
  addKanbanBoard,
  addColumn,
  addTask,
  editTask,
  deleteTask,
  updateTaskStatus,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;
