import { TextField, Box, MenuItem, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";

//local imports
import addNewTaskFormSchema from "schema/addNewTaskFormSchema";

type FormValues = {
  title: string;
  description: string;
  subtasks: {
    name: string;
  }[];
  status: string;
};

export const AddTaskForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      subtasks: [
        {
          name: "",
        },
      ],
      status: "",
    },
    resolver: yupResolver(addNewTaskFormSchema),
    mode: "onTouched",
  });
  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("On Submit", data);
  };
  return (
    <Stack spacing={2}>
      <h4>Add New Task</h4>
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
                />
                <Box onClick={() => remove(index)} sx={{ cursor: "pointer" }}>
                  <CloseIcon />
                </Box>
              </Box>
            ))}
            <Button
              fullWidth
              variant="contained"
              onClick={() => append({ name: "" })}
              sx={{
                borderRadius: "20px",
                marginTop: "10px",
                color: "text.secondary",
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
              defaultValue="Todo"
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              {["Todo", "InProgress", "Code Review", "Done"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
            Create Task
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
