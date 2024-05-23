import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { themeConstants } from "../../helpers";
import { useSignUpMutation } from "../../redux/auth/api";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

function SignUpPage() {
  const [signUp, { isLoading: signUpPending, error: signUpError }] =
    useSignUpMutation();
  const form = useForm({
    validate: yupResolver(validationSchema),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validateInputOnBlur: false,
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: any) => {
    await signUp(values);
  };
  return (
    <div className="container py-5">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            {signUpError && (
              <Alert color="red" className="mb-4">
                {signUpError as string}
              </Alert>
            )}
            <div className="d-flex align-items-center gap-3 mb-4">
              <TextInput
                label="First Name"
                withAsterisk
                flex={1}
                {...form.getInputProps("firstName")}
                classNames={themeConstants.textInputClasses(form, "firstName")}
              />
              <TextInput
                flex={1}
                withAsterisk
                label="Last Name"
                {...form.getInputProps("lastName")}
                classNames={themeConstants.textInputClasses(form, "lastName")}
              />
            </div>

            <div className="mb-4">
              <TextInput
                label="Email"
                withAsterisk
                {...form.getInputProps("email")}
                description="We'll never share your email with anyone else."
                classNames={themeConstants.textInputClasses(form, "email")}
              />
            </div>

            <div className="mb-4">
              <PasswordInput
                label="Password"
                withAsterisk
                {...form.getInputProps("password")}
                classNames={themeConstants.passwordInputClasses(
                  form,
                  "password"
                )}
              />
            </div>

            <div className="mb-4">
              <PasswordInput
                label="Confirm Password"
                withAsterisk
                {...form.getInputProps("confirmPassword")}
                classNames={themeConstants.passwordInputClasses(
                  form,
                  "confirmPassword"
                )}
              />
            </div>
            <div className="mb-4">
              <Button
                fullWidth
                type="submit"
                leftSection={<i className="bi bi-person-plus-fill"></i>}
                disabled={signUpPending}
                loading={signUpPending}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
