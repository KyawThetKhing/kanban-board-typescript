import { useEffect } from "react";
import { TextField, Box, MenuItem, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//local imports
import taskFormSchema from "schema/taskFormSchema";
import { addTask, editTask } from "redux/kanban/kanbanSlice";
import {
  selectColumnsByBoardId,
  selectTaskByTaskId,
} from "redux/kanban/kanbanSelectors";
import { FormValues, TaskFormProps } from "./TaskForm.types";

const initailValues = {
  title: "",
  description: "",
  subtasks: [
    {
      name: "",
    },
  ],
  status: "",
};

export const AddTaskForm = ({
  handleClose,
  taskId,
}: TaskFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: initailValues,
    resolver: yupResolver(taskFormSchema),
    mode: "onTouched",
  });
  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
  });
  const dispatch = useDispatch();
  const { kanbanId } = useParams();

  const columns = useSelector(selectColumnsByBoardId(kanbanId ? kanbanId : ""));
  const taskDetail = useSelector(selectTaskByTaskId(taskId ? taskId : ""));

  useEffect(() => {
    if (taskId && taskDetail) {
      setValue("title", taskDetail.title);
      setValue("description", taskDetail.description);
      setValue("status", taskDetail.status);
      setValue("title", taskDetail.title);
      setValue("subtasks", taskDetail.subtasks);
    }
  }, [taskId, taskDetail]);

  const onSubmit = (data: FormValues) => {
    const column = columns.filter(
      (column: any) => column.title === data.status
    );
    const id = taskId ? taskDetail.id : "task-" + uuidv4();
    const subtasksWithId = data.subtasks.map((subtask) => ({
      ...subtask,
      id: "subtask-" + uuidv4(),
    }));
    const payload = {
      columnId: column[0].id,
      task: {
        id: id,
        title: data.title,
        description: data.description,
        subtasks: subtasksWithId,
        status: data.status,
      },
    };

    if (taskId) {
      dispatch(editTask(payload));
    } else {
      dispatch(addTask(payload));
    }
    reset(initailValues);
    handleClose();
  };

  return (
    <Stack spacing={2}>
      <h4>{taskId ? "Edit Task" : "Add New Task"}</h4>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Box>
            <Box mb={1}>Title</Box>
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
            <Box mb={1}>Description</Box>
            <TextField
              type="textarea"
              size="small"
              fullWidth
              hiddenLabel
              variant="outlined"
              multiline
              minRows={3}
              placeholder="eg. It's always good to take a break. This 15 minutes break will recharge the batteries a little."
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Box>

          <Box>
            <Box mb={1}>Subtask</Box>
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
                  type="text"
                  size="small"
                  fullWidth
                  hiddenLabel
                  variant="outlined"
                  placeholder="eg.Make Coffee"
                  {...register(`subtasks.${index}.name` as const)}
                  defaultValue={field.name}
                  error={!!(errors.subtasks && errors.subtasks[index])}
                  helperText={
                    (errors.subtasks &&
                      errors.subtasks[index]?.name?.message) ??
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
                backgroundColor: "secondary.main",
                color: "common.white",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                  color: "common.white",
                },
              }}
            >
              +Add New Subtask
            </Button>
          </Box>

          <Box>
            <Box mb={1}>Status</Box>
            <TextField
              select
              size="small"
              fullWidth
              hiddenLabel
              variant="outlined"
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
              defaultValue={taskDetail?.status}
            >
              {columns.map((column: any) => (
                <MenuItem key={column.id} value={column.title}>
                  {column.title}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px", margin: "0 10px" }}
          >
            {taskId ? "Update Task" : "Create Task"}
          </Button>
        </Stack>
      </form>

      <DevTool control={control} />
    </Stack>
  );
};
