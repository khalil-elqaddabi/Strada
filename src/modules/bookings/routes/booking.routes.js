import express from "express";
import { createBookingSchema, validate } from "../validators/booking.validator.js";
import { authenticate } from "../../../shared/middlewares/auth.middleware.js";
import { authorize } from "../../../shared/middlewares/require-role.js";

const router = express.Router();

router.post("/", authenticate, authorize("passenger"), validate(createBookingSchema), (req, res, next) => {
  req.container.resolve("bookingController").create(req, res, next);
});

router.get("/", authenticate, authorize("passenger", "admin"), (req, res, next) => {
  req.container.resolve("bookingController").getAll(req, res, next);
});

router.patch("/:id/cancel", authenticate, authorize("passenger"), (req, res, next) => {
  req.container.resolve("bookingController").cancel(req, res, next);
});

export default router;
