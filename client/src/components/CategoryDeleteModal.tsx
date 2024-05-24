import { ActionIcon, Alert, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { themeConstants } from "../helpers";
import { useDeleteCategoryMutation } from "../redux/categories/api";

function CategoryDeleteModal({ categoryId }: { categoryId: string }) {
  const [opened, { open, close }] = useDisclosure();
  const [deleteCategory, { isLoading: deletePending, error: deleteError }] =
    useDeleteCategoryMutation();
  return (
    <>
      <ActionIcon className="btn btn-ghost" onClick={open}>
        <i className="bi bi-trash"></i>
      </ActionIcon>

      <Modal
        classNames={themeConstants.modalClasses()}
        title="Delete Category"
        opened={opened}
        onClose={close}
      >
        <div className="card border-0 w-100 rounded-0">
          <div className="card-body border-0 ">
            {
              deleteError && (
                <Alert color="red" className="mb-4">
                  {deleteError as string}
                </Alert>
              )
            }
            <p className="mb-0">
              Are you sure you want to delete this category?
            </p>
          </div>
          <div className="card-footer border-0 bg-body">
            <div className="d-flex justify-content-end">
              <Button
                disabled={deletePending}
                loading={deletePending}
                color="red"
                onClick={async () => {
                  await deleteCategory({ _id: categoryId as string })
                    .unwrap()
                    .then(() => {
                      close();
                    });
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CategoryDeleteModal;
