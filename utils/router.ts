import express from "express";
const router = express.Router();

import { withAuth } from "../middlewares";
import { uploadImage } from "./controllers";

router.post("/upload-image", withAuth, uploadImage);

export { router };
