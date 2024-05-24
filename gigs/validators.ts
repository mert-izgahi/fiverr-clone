import * as Yup from "yup";

export const gigValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    deliveryDays: Yup.number()
        .min(1, "Delivery Days must be at least 1")
        .max(30, "Delivery Days must be at most 30")
        .required("Delivery Days is required"),
    price: Yup.number()
        .min(1, "Price must be at least 1")
        .required("Price is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.array().required("Tags are required"),
    features: Yup.array().required("Features are required"),
    images: Yup.array()
        .length(3, "Must be 3 images")
        .required("Images are required"),
    imagesFiles: Yup.array()
        .length(3, "Must be 3 images")
        .required("Images files are required"),
})