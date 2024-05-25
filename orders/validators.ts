import * as Yup from "yup";

export const orderValidationSchema = Yup.object({
  gigId: Yup.string().required("Gig Id is Required"),
});
