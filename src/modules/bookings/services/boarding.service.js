function createError(status, code, message) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}

export default class BoardingService {
  constructor({ boardingRepository, departureRepository }) {
    this.boardingRepository = boardingRepository;
    this.departureRepository = departureRepository;
  }

  async validateTicket({ bookingCode, departureId }) {
    const departure =
      await this.departureRepository.findById(departureId);

    if (!departure) {
      throw createError(
        404,
        "DEPARTURE_NOT_FOUND",
        "Departure not found."
      );
    }

    if (departure.status !== "BOARDING") {
      throw createError(
        409,
        "BOARDING_CLOSED",
        "This departure is not open for boarding."
      );
    }

    const booking =
      await this.boardingRepository.findByCode(bookingCode);

    if (!booking) {
      throw createError(
        404,
        "BOOKING_NOT_FOUND",
        "Ticket not found."
      );
    }

    if (booking.departureId.toString() !== departure._id.toString()) {
      throw createError(
        409,
        "WRONG_DEPARTURE",
        "This ticket belongs to another departure."
      );
    }

    if (booking.status !== "CONFIRMED") {
      throw createError(
        409,
        "BOOKING_NOT_CONFIRMED",
        "Only confirmed tickets can be validated."
      );
    }

    if (booking.dateValidation) {
      throw createError(
        409,
        "TICKET_ALREADY_VALIDATED",
        "This ticket has already been validated."
      );
    }

    const validatedBooking =
      await this.boardingRepository.validateOnce({
        bookingId: booking._id,
        departureId: departure._id,
        validatedAt: new Date(),
      });

    if (!validatedBooking) {
      throw createError(
        409,
        "BOOKING_CONFLICT",
        "The ticket changed or was already validated. Check it again."
      );
    }

    return validatedBooking;
  }
}