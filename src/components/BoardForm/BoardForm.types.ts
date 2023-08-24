export type BoardFormProps = {
    boardId?: string;
    handleClose: () => void;
};

export type FormValues = {
    title: string;
    columns: {
      name: string;
    }[];
};