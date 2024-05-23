import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import configs from "../configs";

cloudinary.config({
  cloud_name: configs.CLOUDINARY_CLOUD_NAME,
  api_key: configs.CLOUDINARY_API_KEY,
  api_secret: configs.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req: Request, res: Response) => {
  const file = req.files?.image;

  if (!file) return res.status(400).json({ result: "No file uploaded" });
  // Handle the case where file is an array
  const tempFilePath = Array.isArray(file)
    ? file[0].tempFilePath
    : file.tempFilePath;

  const result = await cloudinary.uploader.upload(tempFilePath as string, {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "job-portal",
  });

  res.status(200).json({
    result: {
      url: result.secure_url,
      public_id: result.public_id,
    },
  });
};
