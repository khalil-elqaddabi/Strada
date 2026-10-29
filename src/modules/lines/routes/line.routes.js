import express from "express";
import { createLineSchema, updateLineSchema, validate } from "../validators/line.validator.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  req.container.resolve("lineController").getAll(req, res, next);
});

router.post("/", validate(createLineSchema), (req, res, next) => {
  req.container.resolve("lineController").create(req, res, next);
});

router.patch("/:id", validate(updateLineSchema), (req, res, next) => {
  req.container.resolve("lineController").update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  req.container.resolve("lineController").archive(req, res, next);
});

export default router;
