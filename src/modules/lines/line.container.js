import { asClass, asValue } from "awilix";

import Line from "./models/line.model.js";
import LineRepository from "./repositories/line.repository.js";
import LineService from "./v1/services/line.service.js";
import LineController from "./v1/controllers/line.controller.js";

export default function registerLines(container) {
  container.register({
    lineModel:      asValue(Line),
    lineRepository: asClass(LineRepository).scoped(),
    lineService:    asClass(LineService).scoped(),
    lineController: asClass(LineController).scoped(),
  });
}
