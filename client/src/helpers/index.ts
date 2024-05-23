import { UseFormReturnType } from "@mantine/form";

export const themeConstants = {
  textInputClasses: (form: UseFormReturnType<any>, name: string) => {
    return {
      input: `form-control ${form.errors[name] && "is-invalid"}`,
      label: "form-label",
      description: "form-text",
    };
  },
  passwordInputClasses: (form: UseFormReturnType<any>, name: string) => {
    return {
      input: `form-control ${form.errors[name] && "is-invalid"}`,
      label: "form-label",
      description: "form-text",
    };
  },
};

export const defaultTransformResponse = (response: {
  result: any;
  status: number;
}) => {
  return response.result;
};

export const defaultTransformErrorResponse = (baseQueryReturnValue: any) => {
  const errorMessage =
    (baseQueryReturnValue?.data?.message as string) || "Something went wrong";
  return errorMessage;
};
