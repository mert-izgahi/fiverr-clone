import {
  ActionIcon,
  Alert,
  Button,
  Drawer,
  Stack,
  TextInput,
  Textarea,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import * as Yup from "yup";
import { themeConstants } from "../helpers";
import { categoryIcons } from "../constants/categoryIcons";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../redux/categories/api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  icon: Yup.string().required("Icon is required"),
});

function CategoryDrawerForm({
  mode,
  name,
  description,
  icon,
  categoryId,
}: {
  mode: "create" | "update";
  name: string;
  description: string;
  icon: string;
  categoryId?: string;
}) {
  const [opened, { open, close }] = useDisclosure();
  const [createCategory, { isLoading: createPending, error: createError }] =
    useCreateCategoryMutation();

  const [updateCategory, { isLoading: updatePending, error: updateError }] =
    useUpdateCategoryMutation();

  const form = useForm({
    initialValues: {
      name,
      description,
      icon,
    },
    validate: yupResolver(validationSchema),
  });

  const handleSubmit = async (values: any) => {
    if (mode === "create") {
      await createCategory(values)
        .unwrap()
        .then(() => {
          close();
        });
    }

    if (mode === "update") {
      await updateCategory({
        _id: categoryId,
        ...values,
      })
        .unwrap()
        .then(() => {
          close();
        });
    }
  };

  return (
    <>
      {mode === "create" && <Button onClick={open}>New Category</Button>}
      {mode === "update" && (
        <ActionIcon className="btn btn-ghost" onClick={open}>
          <i className="bi bi-pencil"></i>
        </ActionIcon>
      )}
      <Drawer
        className=""
        title="Create Category"
        opened={opened}
        onClose={close}
        classNames={themeConstants.drawerClasses()}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {createError && (
              <Alert color="red" className="mb-4">
                {createError as string}
              </Alert>
            )}

            {updateError && (
              <Alert color="red" className="mb-4">
                {updateError as string}
              </Alert>
            )}
            <div className="mb-4">
              <TextInput
                label="Name"
                {...form.getInputProps("name")}
                classNames={themeConstants.textInputClasses(form, "name")}
              />
            </div>
            <div className="mb-4">
              <Textarea
                label="Description"
                {...form.getInputProps("description")}
                classNames={themeConstants.textInputClasses(
                  form,
                  "description"
                )}
              />
            </div>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-3 mb-5">
              {categoryIcons.map((icon) => (
                <div className="col-12" key={icon.categoryLabel}>
                  <Tooltip label={icon.categoryLabel}>
                    <UnstyledButton
                      className={`btn ${
                        form.values.icon === icon.categoryIcon
                          ? "btn-primary"
                          : ""
                      }`}
                      onClick={() => {
                        form.setFieldValue("icon", icon.categoryIcon);
                        form.setFieldValue("name", icon.categoryLabel);
                      }}
                    >
                      <i className={icon.categoryIcon}></i>
                    </UnstyledButton>
                  </Tooltip>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={createPending || updatePending}
              loading={createPending || updatePending}
            >
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </Stack>
        </form>
      </Drawer>
    </>
  );
}

export default CategoryDrawerForm;
