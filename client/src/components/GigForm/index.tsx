import { Button, Stepper } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import * as Yup from "yup";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { useCreateGigMutation } from "../../redux/gigs/api";
import { useUploadImageMutation } from "../../redux/utils/api";
import GigPreview from "./GigPreview";
import toast from "react-hot-toast";

const steps = [
  {
    title: "Overview",
    description: "Basic Info about your gig",
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
  },
  {
    title: "Pricing",
    description: "Gig pricing details",
    validationSchema: Yup.object().shape({
      deliveryDays: Yup.number()
        .min(1, "Delivery Days must be at least 1")
        .max(30, "Delivery Days must be at most 30")
        .required("Delivery Days is required"),
      price: Yup.number()
        .min(1, "Price must be at least 1")
        .required("Price is required"),
    }),
  },
  {
    title: "Details",
    description: "Gig details",
    validationSchema: Yup.object().shape({
      category: Yup.string().required("Category is required"),
      tags: Yup.array().required("Tags are required"),
      features: Yup.array().required("Features are required"),
    }),
  },
  {
    title: "FAQ",
    description: "Frequently asked questions",
    validationSchema: Yup.object().shape({
      faqs: Yup.array(
        Yup.object().shape({
          question: Yup.string().required("Question is required"),
          answer: Yup.string().required("Answer is required"),
        })
      ).required("FAQs are required"),
    }),
  },
  {
    title: "Images",
    description: "Gig images",
    validationSchema: Yup.object().shape({
      images: Yup.array()
        .length(3, "Must be 3 images")
        .required("Images are required"),
      imagesFiles: Yup.array()
        .length(3, "Must be 3 images")
        .required("Images files are required"),
    }),
  },
  {
    title: "Preview",
    description: "Gig preview",
  },
];

function GigForm({ mode }: { mode: "create" | "edit" }) {
  const [createGig, { isLoading: createGigPending, error: createGigError }] =
    useCreateGigMutation();

  const [
    uploadImage,
    { isLoading: uploadImagePending, error: uploadImageError },
  ] = useUploadImageMutation();

  const [active, setActive] = useState(0);

  const form = useForm({
    validate:
      active < steps.length - 1
        ? yupResolver(steps[active].validationSchema)
        : undefined,
    initialValues: {
      title: "",
      description: "",
      deliveryDays: 0,
      price: 0,
      category: "",
      tags: [],
      features: [],
      faqs: [],
      images: [],
      coverUrl: "",
    },
    validateInputOnBlur: false,
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: any) => {
    if (active < steps.length - 1) {
      setActive((current) => current + 1);
    } else {
      // upload images

      if (values.imagesFiles) {
        const images = await Promise.all(
          values.imagesFiles.map((imageFile: File) =>
            uploadImage({ imageFile })
          )
        );
        delete values.imagesFiles;
        values.images = images.map((image) => image.data?.url);
        values.coverUrl = values.images[0];
      }

      if (mode === "create") {
        await createGig(values)
          .unwrap()
          .then(() => {
            toast.success("Gig created successfully");
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    }
  };

  const prevStep = () => {
    if (active > 0) {
      setActive((current) => current - 1);
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="card">
        <div className="card-header py-3">
          <div className="d-flex justify-content-between align-items-center">
            <Stepper
              allowNextStepsSelect={false}
              active={active}
              onStepClick={setActive}
              classNames={{
                root: "w-100",
                stepIcon: "rounded-1",
                stepLabel: "ma",
              }}
            >
              {steps.map((step, index) => (
                <Stepper.Step
                  key={index}
                  label={step.title}
                  description={step.description}
                />
              ))}
            </Stepper>
          </div>
        </div>
        <div className="card-body" style={{ minHeight: "500px" }}>
          {active === 0 && <Step1 form={form} />}

          {active === 1 && <Step2 form={form} />}

          {active === 2 && <Step3 form={form} />}

          {active === 3 && <Step4 form={form} />}

          {active === 4 && <Step5 form={form} />}
          {active === 5 && <GigPreview form={form} />}
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end gap-3">
            <Button disabled={active === 0} onClick={prevStep}>
              Back
            </Button>
            <Button
              type="submit"
              disabled={createGigPending || uploadImagePending}
              loading={createGigPending || uploadImagePending}
            >
              {active === 5 ? "Publish Gig" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default GigForm;
