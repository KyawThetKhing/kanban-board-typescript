import { createSelector } from "@reduxjs/toolkit";
//Get All KanBans
export const selectKanbanBoards = (state: any) =>
  state.kanban.kanbanBoards.allIds.map(
    (id: string) => state.kanban.kanbanBoards.byId[id]
  );

//Get columns by board Id
export const selectColumnsByBoardId = (boardId: string) =>
  createSelector(
    [
      (state) => state.kanban.kanbanBoards.byId,
      (state: any) => state.kanban.columns.byId,
    ],
    (kanbanBoards, columns) => {
      const board = kanbanBoards[boardId];
      if (!board) {
        return [];
      }
      return board.columns.map((columnId: string) => columns[columnId]);
    }
  );

//Get task by columns Id
export const selectTasksByColumnId = (columnId: string) =>
  createSelector(
    [
      (state: any) => state.kanban.columns.byId,
      (state: any) => state.kanban.tasks.byId,
    ],
    (columns, tasks) => {
      const column = columns[columnId];
      if (!column) {
        return [];
      }

      return column.tasks.map((taskId: string) => tasks[taskId]);
    }
  );

//Get task detail by taskId
export const selectTaskByTaskId = (taskId: string) =>
  createSelector([(state: any) => state.kanban.tasks.byId], (tasks) => {
    return tasks[taskId];
  });
