class BookingRepository {
  constructor({ bookingModel }) {
    this.Booking = bookingModel;
  }

  async countActive(departureId) {
    return this.Booking.countDocuments({
      departureId,
      status: { $in: ["CONFIRMED", "PENDING"] },
    });
  }

  async create(data) {
    return this.Booking.create(data);
  }

  async findAll({ userId, page, limit }) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.Booking.find({ userId }).skip(skip).limit(limit),
      this.Booking.countDocuments({ userId }),
    ]);
    return { data, total };
  }

  async findById(id) {
    return this.Booking.findById(id);
  }

  async updateStatus(id, status) {
    return this.Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }
}

export default BookingRepository;
