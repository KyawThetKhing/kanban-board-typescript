export interface ITask {
  id: number;
  title: string;
  description: string;
  subtasks: string[];
  status: string;
}

export interface IColumn {
  id: number;
  title: string;
  tasks: number[];
}

export interface IKanbanBoard {
  id: number;
  title: string;
  columns: number[];
}

export interface IKanbanState {
  kanbanBoards: {
    byId: Record<string, IKanbanBoard>;
    allIds: number[];
  };
  columns: {
    byId: Record<string, IColumn>;
    allIds: number[];
  };
  tasks: {
    byId: Record<string, ITask>;
    allIds: number[];
  };
}
