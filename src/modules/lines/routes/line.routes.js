import express from "express";
import { createLineSchema, updateLineSchema, validate } from "../validators/line.validator.js";
import { authenticate } from "../../../shared/middlewares/auth.middleware.js";
import { authorize } from "../../../shared/middlewares/require-role.js";
const router = express.Router();

router.post("/", authenticate, authorize("admin"), validate(createLineSchema), (req, res, next) => {
  req.container.resolve("lineController").create(req, res, next);
});
router.patch("/:id", authenticate, authorize("admin"), validate(updateLineSchema), (req, res, next) => {
  req.container.resolve("lineController").update(req, res, next);
});
router.delete("/:id", authenticate, authorize("admin"), (req, res, next) => {
  req.container.resolve("lineController").archive(req, res, next);
});
router.get("/", (req, res, next) => {
  req.container.resolve("lineController").getAll(req, res, next);
});

export default router;
