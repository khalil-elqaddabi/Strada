import { Router } from "express";

import Coach from "../models/coach.model.js";
import CoachRepository from "../repositories/coach.repository.js";
import CoachService from "../services/coach.service.js";
import CoachController from "../controllers/coach.controller.js";

import {
  createCoachSchema,
  updateCoachSchema,
  validateCoach,
} from "../validators/coach.validator.js";

const router = Router();

const repository = new CoachRepository(Coach);
const service = new CoachService(repository);
const controller = new CoachController(service);

router.post(
  "/",
  validateCoach(createCoachSchema),
  controller.create.bind(controller)
);

router.get(
  "/",
  controller.findAll.bind(controller)
);

router.get(
  "/:id",
  controller.findById.bind(controller)
);

router.patch(
  "/:id",
  validateCoach(updateCoachSchema),
  controller.update.bind(controller)
);

router.delete(
  "/:id",
  controller.archive.bind(controller)
);

export default router;