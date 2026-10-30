import { Router } from "express";

import {
  createCoachSchema,
  updateCoachSchema,
  validateCoach,
} from "../validators/coach.validator.js";

const router = Router();

router.post(
  "/",
  validateCoach(createCoachSchema),
  (req, res, next) => {
    return req.container
      .resolve("coachController")
      .create(req, res, next);
  }
);

router.get("/", (req, res, next) => {
  return req.container
    .resolve("coachController")
    .getAll(req, res, next);
});

router.get("/:id", (req, res, next) => {
  return req.container
    .resolve("coachController")
    .getById(req, res, next);
});

router.patch(
  "/:id",
  validateCoach(updateCoachSchema),
  (req, res, next) => {
    return req.container
      .resolve("coachController")
      .update(req, res, next);
  }
);

router.delete("/:id", (req, res, next) => {
  return req.container
    .resolve("coachController")
    .delete(req, res, next);
});

router.use((error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({
      error: {
        code: "RESOURCE_CONFLICT",
        message: "Registration already exists.",
      },
    });
  }

  return next(error);
});

export default router;