import { useEffect, useMemo, useState } from "react";
import UserAccountForm from "../../components/UserAccountForm";
import * as Yup from "yup";
import { useUploadImageMutation } from "../../redux/utils/api";
import { useAppSelector } from "../../redux/store";
import { useForm, yupResolver } from "@mantine/form";
import { useUpdateAccountMutation } from "../../redux/auth/api";
import { useGetGigsBySellerIdQuery } from "../../redux/gigs/api";
import { useSearchParams } from "react-router-dom";
import GigsTable from "../../components/GigsTable";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  bio: Yup.string().optional(),
  gender: Yup.string().optional(),
  imageUrl: Yup.string().optional(),
});
function AccountPage() {
  const [searchParams] = useSearchParams();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [
    uploadImage,
    { isLoading: uploadImagePending, error: uploadImageError },
  ] = useUploadImageMutation();
  const [
    updateAccount,
    { isLoading: updateUserPending, error: updateUserError },
  ] = useUpdateAccountMutation();

  const { data: sellerGigsData, isLoading } = useGetGigsBySellerIdQuery({
    searchParams: searchParams.toString(),
    sellerId: currentUser._id,
  } as any);

  const gigs = useMemo(() => {
    if (sellerGigsData) {
      return sellerGigsData.records;
    }
  }, [sellerGigsData]);

  const totalPages = useMemo(() => {
    if (sellerGigsData) {
      return sellerGigsData.total;
    }
  }, [sellerGigsData]);
  const accountForm = useForm({
    initialValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      bio: currentUser?.bio || "",
      gender: currentUser?.gender || "",
      imageUrl: currentUser?.imageUrl || "",
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
      values.imageUrl = imageUrl;
    }

    await updateAccount({
      ...values,
    });
  };

  useEffect(() => {
    if (currentUser) {
      accountForm.setValues(currentUser);
      accountForm.setFieldValue("bio", currentUser?.bio || "");
      accountForm.setFieldValue("gender", currentUser?.gender || "");
    }
  }, [currentUser]);

  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <div className="col-12">
          <GigsTable
            gigs={gigs!}
            totalPages={totalPages!}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <UserAccountForm
            title="Account Settings"
            saveLabel="Save Changes"
            isPending={uploadImagePending || updateUserPending}
            error={
              (uploadImageError as string | null) ||
              (updateUserError as string | null)
            }
            form={accountForm}
            handleSubmit={handleAccountFormSubmit}
            handleImageChange={handleImageChange}
            isAdmin={false}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
