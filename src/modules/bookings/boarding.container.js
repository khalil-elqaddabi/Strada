import { asClass, asValue } from "awilix";

import Booking from "./models/booking.model.js";
import BoardingRepository from "./repositories/boarding.repository.js";
import BoardingService from "./services/boarding.service.js";
import BoardingController from "./controllers/boarding.controller.js";
import BoardingValidator from "./validators/boarding.validator.js";

export default function registerBoarding(container) {
  container.register({
    bookingModel: asValue(Booking),

    boardingRepository: asClass(BoardingRepository).scoped(),

    boardingService: asClass(BoardingService).scoped(),

    boardingController: asClass(BoardingController).scoped(),

    boardingValidator: asClass(BoardingValidator).scoped(),
  });
}