export default class BoardingRepository {
  constructor({ bookingModel }) {
    this.bookingModel = bookingModel;
  }

  findByCode(bookingCode) {
    return this.bookingModel.findOne({ bookingCode });
  }

  validateOnce({ bookingId, departureId, validatedAt }) {
    return this.bookingModel.findOneAndUpdate(
      {
        _id: bookingId,
        departureId,
        status: "CONFIRMED",
        dateValidation: null,
      },
      {
        $set: {
          dateValidation: validatedAt,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
  }
}