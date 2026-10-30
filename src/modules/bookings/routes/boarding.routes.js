import { Router } from "express";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";
import { authorize } from "../../../shared/middlewares/require-role.js";

const router = Router();

router.post(
  "/validate",
  authenticate,
  authorize("agent"),
  (req, res, next) => {
    return req.container
      .resolve("boardingValidator")
      .validateTicket(req, res, next);
  },
  (req, res, next) => {
    return req.container
      .resolve("boardingController")
      .validateTicket(req, res, next);
  }
);

export default router;