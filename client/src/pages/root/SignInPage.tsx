import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { themeConstants } from "../../helpers";
import { useSignInMutation } from "../../redux/auth/api";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
function SignInPage() {
  const [signIn, { isLoading: signInPending, error: signInError }] =
    useSignInMutation();
  const form = useForm({
    validate: yupResolver(validationSchema),
    initialValues: {
      email: "",
      password: "",
    },

    validateInputOnBlur: false,
    validateInputOnChange: true,
  });
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    await signIn(values)
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="container py-5">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            {signInError && (
              <Alert color="red" className="mb-4">
                {signInError as string}
              </Alert>
            )}

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
              <Button
                fullWidth
                type="submit"
                leftSection={<i className="bi bi-box-arrow-in-right"></i>}
                disabled={signInPending}
                loading={signInPending}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
