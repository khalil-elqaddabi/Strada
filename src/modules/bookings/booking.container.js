import { asClass, asValue } from "awilix";

import Booking from "./models/booking.model.js";
import BookingRepository from "./repositories/booking.repository.js";
import BookingService from "./services/booking.service.js";
import BookingController from "./controllers/booking.controller.js";

export default function registerBookings(container) {
  container.register({
    bookingModel:      asValue(Booking),
    bookingRepository: asClass(BookingRepository).scoped(),
    bookingService:    asClass(BookingService).scoped(),
    bookingController: asClass(BookingController).scoped(),
  });
}
