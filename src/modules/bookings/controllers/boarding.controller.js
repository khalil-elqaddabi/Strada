export default class BoardingController {
  constructor({ boardingService }) {
    this.boardingService = boardingService;
  }

  async validateTicket(req, res, next) {
    try {
      const { bookingCode, departureId } = req.body;

      const booking = await this.boardingService.validateTicket({
        bookingCode,
        departureId,
      });

      return res.status(200).json({
        data: booking,
      });
    } catch (error) {
      return next(error);
    }
  }
}