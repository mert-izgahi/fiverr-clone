import * as Yup from "yup";
export const categoryValidationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  description: Yup.string()
    .max(255, "Description is too long")
    .required("Description is Required"),
  icon: Yup.string().required("Icon is Required"),
});
