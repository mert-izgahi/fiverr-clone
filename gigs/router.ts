import express from "express";
import { withAuth, forAdmin, withValidate } from "../middlewares";
import {
  getGigs,
  getMyGigs,
  getGig,
  createGig,
  updateGig,
  deleteGig,
} from "./controllers";
import { gigValidationSchema } from "./validators";

const router = express.Router();

router.post("/gigs", withAuth, withValidate(gigValidationSchema), createGig);
router.get("/gigs", getGigs);
router.get("/account/gigs", getMyGigs);
router.get("/gigs/:id", getGig);
router.put("/gigs/:id", withAuth, withValidate(gigValidationSchema), updateGig);
router.delete("/categories/:id", withAuth, deleteGig);

export { router };
