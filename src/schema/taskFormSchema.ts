import * as Yup from "yup";

const taskFormSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title must be less than 50"),
  description: Yup.string().required("Description is required"),
  subtasks: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Subtask is required"),
    })
  ),
  status: Yup.string().required("Status is required"),
});

export default taskFormSchema;
