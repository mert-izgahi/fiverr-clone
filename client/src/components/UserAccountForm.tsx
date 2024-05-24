import {
  Alert,
  Avatar,
  Button,
  FileButton,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { themeConstants } from "../helpers";
import { UseFormReturnType } from "@mantine/form";

function UserAccountForm({
  title,
  saveLabel,
  isPending,
  error,
  form,
  handleImageChange,
  handleSubmit,
}: {
  title: string;
  saveLabel: string;
  isPending: boolean;
  error?: string | null;
  form: UseFormReturnType<any>;
  handleImageChange: (file: File | null) => void;
  handleSubmit: (values: any) => void;
}) {
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <div className="card">
        <div className="card-header py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">{title}</h4>
            <div className="d-flex align-items-center gap-3 ms-auto">
              <Button disabled={isPending} loading={isPending} type="submit">
                <span className="text-uppercase">{saveLabel}</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="d-flex align-items-end gap-3">
              <Avatar
                src={form?.values.imageUrl}
                size="xl"
                radius={"xs"}
                classNames={{
                  image: "img-thumbnail",
                }}
              />
              <FileButton
                onChange={handleImageChange}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    {...props}
                  >
                    Upload Image
                  </button>
                )}
              </FileButton>
            </div>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            {error && (
              <Alert color="red" className="mb-4">
                {error}
              </Alert>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <TextInput
                  label="First Name"
                  {...form.getInputProps("firstName")}
                  classNames={themeConstants.textInputClasses(
                    form,
                    "firstName"
                  )}
                />
              </div>

              <div className="col">
                <TextInput
                  label="Last Name"
                  {...form.getInputProps("lastName")}
                  classNames={themeConstants.textInputClasses(form, "lastName")}
                />
              </div>

              <div className="col">
                <TextInput
                  label="Email"
                  {...form.getInputProps("email")}
                  classNames={themeConstants.textInputClasses(form, "email")}
                />
              </div>

              <div className="col">
                <Select
                  label="Role"
                  {...form.getInputProps("role")}
                  data={[
                    {
                      value: "admin",
                      label: "Admin",
                    },
                    {
                      value: "user",
                      label: "User",
                    },
                  ]}
                  classNames={themeConstants.selectInputClasses(form, "role")}
                />
              </div>

              <div className="col">
                <Select
                  label="Gender"
                  {...form.getInputProps("gender")}
                  data={[
                    {
                      value: "male",
                      label: "Male",
                    },
                    {
                      value: "female",
                      label: "Female",
                    },
                  ]}
                  classNames={themeConstants.selectInputClasses(form, "gender")}
                />
              </div>

              <div className="col-12 col-md-12 col-lg-12">
                <Textarea
                  label="Bio"
                  {...form.getInputProps("bio")}
                  classNames={themeConstants.textInputClasses(form, "bio")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </form>
  );
}

export default UserAccountForm;
