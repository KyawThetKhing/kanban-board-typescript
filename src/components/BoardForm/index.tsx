import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//local imports
import boardFormSchema from "schema/boardFormSchema";
import { addColumn, addKanbanBoard } from "redux/kanban/kanbanSlice";

type FormValues = {
  title: string;
  columns: {
    name: string;
  }[];
};
export const BoardForm = ({
  boardId,
  handleClose,
}: {
  boardId?: string;
  handleClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      columns: [{ name: "" }],
    },
    resolver: yupResolver(boardFormSchema),
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control,
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    const boardId = "board-" + uuidv4();
    const kanbanObj = {
      id: boardId,
      title: data.title,
      columns: [],
    };
    await dispatch(addKanbanBoard(kanbanObj));

    data.columns.forEach(async (column) => {
      const columnId = "column-" + uuidv4();
      const columnObj = {
        kanbanBoardId: boardId,
        column: {
          id: columnId,
          title: column.name,
          tasks: [],
        },
      };
      await dispatch(addColumn(columnObj));
    });
    handleClose();
  };

  return (
    <Stack spacing={2}>
      <h4>{boardId ? "Edit Board" : "Add New Board"}</h4>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Box>
            <Box>Name</Box>
            <TextField
              type="text"
              size="small"
              fullWidth
              hiddenLabel
              variant="outlined"
              placeholder="eg. Take coffee break"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Box>
          <Box>
            <Box>Columns</Box>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <TextField
                  key={field.id}
                  type="text"
                  size="small"
                  fullWidth
                  hiddenLabel
                  variant="outlined"
                  placeholder="eg. Take coffee break"
                  {...register(`columns.${index}.name` as const)}
                  error={!!(errors.columns && errors.columns[index])}
                  helperText={
                    (errors.columns && errors.columns[index]?.name?.message) ??
                    ""
                  }
                />

                {index > 0 && (
                  <Box onClick={() => remove(index)} sx={{ cursor: "pointer" }}>
                    <CloseIcon />
                  </Box>
                )}
              </Box>
            ))}
            <Button
              fullWidth
              variant="contained"
              onClick={() => append({ name: "" })}
              sx={{
                borderRadius: "20px",
                marginTop: "10px",
                backgroundColor: "text.secondary",
              }}
            >
              +Add New Column
            </Button>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px", margin: "0 10px" }}
          >
            {boardId ? "Update Board" : "Create Board"}
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </Stack>
  );
};
