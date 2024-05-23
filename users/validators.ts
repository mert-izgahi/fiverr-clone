import * as Yup from "yup";

export const signUpSchema = Yup.object({
  firstName: Yup.string().required("First name is Required"),
  lastName: Yup.string().required("Last name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
});

export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is Required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is Required"),
});
