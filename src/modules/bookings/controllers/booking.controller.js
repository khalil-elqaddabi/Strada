class BookingController {
  constructor({ bookingService }) {
    this.bookingService = bookingService;
  }

  async create(req, res, next) {
    try {
      const booking = await this.bookingService.create({
        departureId: req.body.departureId,
        userId: req.user.id,
      });
      res.status(201).json({ data: booking });
    } catch (err) { next(err); }
  }

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const result = await this.bookingService.getAll({
        userId: req.user.id,
        page: +page,
        limit: +limit,
      });
      res.status(200).json(result);
    } catch (err) { next(err); }
  }

  async cancel(req, res, next) {
    try {
      const booking = await this.bookingService.cancelBooking({
        bookingId: req.params.id,
        userId: req.user.id,
      });
      res.status(200).json({ data: booking });
    } catch (err) { next(err); }
  }
}

export default BookingController;
