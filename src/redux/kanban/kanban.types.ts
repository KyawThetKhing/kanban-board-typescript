export interface ITask {
  id: string;
  title: string;
  description: string;
  subtasks: ISubTask[];
  status: string;
}

export interface ISubTask {
  name: string;
}

export interface IColumn {
  id: string;
  title: string;
  tasks: string[];
}

export interface IKanbanBoard {
  id: string;
  title: string;
  columns: string[];
}

export interface IKanbanState {
  kanbanBoards: {
    byId: Record<string, IKanbanBoard>;
    allIds: string[];
  };
  columns: {
    byId: Record<string, IColumn>;
    allIds: string[];
  };
  tasks: {
    byId: Record<string, ITask>;
    allIds: string[];
  };
}
