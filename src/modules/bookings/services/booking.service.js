import { randomUUID } from "crypto";

class BookingService {
  constructor({ bookingRepository, departureModel, coachModel }) {
    this.bookingRepository = bookingRepository;
    this.Departure = departureModel;
    this.Coach = coachModel;
  }

  async create({ departureId, userId }) {
    const departure = await this.Departure.findById(departureId);
    if (!departure) {
      const err = new Error("Departure not found.");
      err.code = "RESOURCE_NOT_FOUND";
      err.status = 404;
      throw err;
    }

    if (departure.departureAt <= new Date()) {
      const err = new Error("You can only book a departure in the future.");
      err.code = "DEPARTURE_NOT_BOOKABLE";
      err.status = 409;
      throw err;
    }

    if (departure.status !== "OPEN") {
      const err = new Error("Departure is not open for booking.");
      err.code = "DEPARTURE_NOT_BOOKABLE";
      err.status = 409;
      throw err;
    }

    const coach = await this.Coach.findById(departure.coachId);
    if (!coach) {
      const err = new Error("Coach not found.");
      err.code = "RESOURCE_NOT_FOUND";
      err.status = 404;
      throw err;
    }

    const count = await this.bookingRepository.countActive(departureId);
    if (count >= coach.seatNumbers.length) {
      const err = new Error("No available seats.");
      err.code = "SEAT_UNAVAILABLE";
      err.status = 409;
      throw err;
    }

    const seatNumber = count + 1;
    const bookingCode = randomUUID();

    return this.bookingRepository.create({
      bookingCode,
      userId,
      departureId,
      seatNumber,
      status: "CONFIRMED",
    });
  }

  async getAll({ userId, page = 1, limit = 20 }) {
    const { data, total } = await this.bookingRepository.findAll({ userId, page, limit });
    return { data, pagination: { page, limit, total } };
  }

  async cancelBooking({ bookingId, userId }) {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      const err = new Error("Booking not found.");
      err.code = "RESOURCE_NOT_FOUND";
      err.status = 404;
      throw err;
    }

    if (booking.userId.toString() !== userId.toString()) {
      const err = new Error("You can only cancel your own booking.");
      err.code = "FORBIDDEN";
      err.status = 403;
      throw err;
    }

    if (booking.status === "CANCELLED") {
      const err = new Error("This booking is already cancelled.");
      err.code = "BOOKING_ALREADY_CANCELLED";
      err.status = 409;
      throw err;
    }

    const departure = await this.Departure.findById(booking.departureId);
    if (!departure) {
      const err = new Error("Departure not found.");
      err.code = "RESOURCE_NOT_FOUND";
      err.status = 404;
      throw err;
    }

    if (departure.departureAt <= new Date()) {
      const err = new Error("You cannot cancel a booking after the departure time.");
      err.code = "BOOKING_NOT_CANCELLABLE";
      err.status = 409;
      throw err;
    }

    return this.bookingRepository.updateStatus(bookingId, "CANCELLED");
  }
}

export default BookingService;
