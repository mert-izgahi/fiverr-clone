import { UseFormReturnType } from "@mantine/form";

export const themeConstants = {
  textInputClasses: (form: UseFormReturnType<any> | null, name: string) => {
    return {
      input: `form-control ${form && form.errors[name] && "is-invalid"}`,
      label: "form-label",
      description: "form-text",
    };
  },
  selectInputClasses:(form: UseFormReturnType<any> | null, name: string) => {
    return {
      input: `form-select ${form && form.errors[name] && "is-invalid"}`,
      label: "form-label",
      description: "form-text",
      section:"d-none"
    };
  },
  passwordInputClasses: (form: UseFormReturnType<any> | null, name: string) => {
    return {
      input: `form-control ${form && form.errors[name] && "is-invalid"}`,
      label: "form-label",
      description: "form-text",
    };
  },

  drawerClasses: () => {
    return {
      content: "bg-body",
      header: "bg-primary mb-5",
      body: "p-3",
      title: "text-white",
      close: "text-muted",
    };
  },

  modalClasses: () => {
    return {
      content: "bg-body",
      header: "bg-body",
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
