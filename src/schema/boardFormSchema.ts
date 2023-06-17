import * as Yup from "yup";

const boardFormSchema = Yup.object({
  title: Yup.string()
    .required("Name is required")
    .max(50, "Name must be less than 50"),
  columns: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Column is required"),
    })
  ),
});

export default boardFormSchema;
