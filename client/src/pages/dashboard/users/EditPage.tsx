import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/users/api";
import LoadingState from "../../../components/LoadingState";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import UserAccountForm from "../../../components/UserAccountForm";
import { useUploadImageMutation } from "../../../redux/utils/api";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  role: Yup.string().required("Role is required"),
  bio: Yup.string(),
  gender: Yup.string(),
  imageUrl: Yup.string(),
});

function EditPage() {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { data: userData, isLoading } = useGetUserQuery(
    {
      _id: id as string,
    } as any,
    {
      skip: !id,
    }
  );
  const [
    uploadImage,
    { isLoading: uploadImagePending, error: uploadImageError },
  ] = useUploadImageMutation();

  const [updateUser, { isLoading: updateUserPending, error: updateUserError }] =
    useUpdateUserMutation();
  const accountForm = useForm({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      role: userData?.role || "",
      bio: userData?.bio || "",
      gender: userData?.gender || "",
      imageUrl: userData?.imageUrl || "",
    },
    validateInputOnChange: true,
    validateInputOnBlur: false,
    validate: yupResolver(validationSchema),
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      accountForm.setFieldValue("imageUrl", url);
      setImageFile(file);
    }
  };

  const handleAccountFormSubmit = async (values: any) => {
    if (imageFile) {
      const res = await uploadImage({
        imageFile,
      });

      const imageUrl = await res.data?.url;
      // accountForm.setFieldValue("imageUrl", imageUrl!);
      values.imageUrl = imageUrl
    }
    console.log(values);
    
    await updateUser({
      _id: id as string,
      ...values,
    });
  };

  useEffect(() => {
    if (userData) {
      accountForm.setValues(userData);
    }
  }, [userData]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <UserAccountForm
            title="Edit User"
            saveLabel="Save Changes"
            isPending={uploadImagePending || updateUserPending}
            error={
              (uploadImageError as string | null) ||
              (updateUserError as string | null)
            }
            form={accountForm}
            handleSubmit={handleAccountFormSubmit}
            handleImageChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default EditPage;
