
import express from "express";

import {
  createStopSchema,
  updateStopSchema,
  validate,
} from "../validators/stop.validator.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  req.container
    .resolve("stopController")
    .getAll(req, res, next);
});

router.get("/:id", (req, res, next) => {
  req.container
    .resolve("stopController")
    .getById(req, res, next);
});

router.post(
  "/",
  validate(createStopSchema),
  (req, res, next) => {
    req.container
      .resolve("stopController")
      .create(req, res, next);
  }
);

router.patch(
  "/:id",
  validate(updateStopSchema),
  (req, res, next) => {
    req.container
      .resolve("stopController")
      .update(req, res, next);
  }
);

router.delete("/:id", (req, res, next) => {
  req.container
    .resolve("stopController")
    .delete(req, res, next);
});

export default router;
