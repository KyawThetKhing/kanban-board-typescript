import * as Yup from "yup";

const addNewTaskFormSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  subtasks: Yup.array().optional(),
  status: Yup.string().required("Status is Required"),
});

export default addNewTaskFormSchema;
