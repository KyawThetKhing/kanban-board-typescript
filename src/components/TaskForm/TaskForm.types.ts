export type TaskFormProps = {
    handleClose: () => void;
    taskId?: string;
  }

  export type FormValues = {
    title: string;
    description: string;
    subtasks: {
      name: string;
    }[];
    status: string;
  };
  