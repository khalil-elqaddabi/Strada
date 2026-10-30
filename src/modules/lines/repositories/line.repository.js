class LineRepository {
  constructor({ lineModel }) {
    this.Line = lineModel;
  }

  async findAll({ page, limit }) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.Line.find({ isArchived: false }).populate("stops").skip(skip).limit(limit),
      this.Line.countDocuments({ isArchived: false }),
    ]);
    return { data, total };
  }

  async findById(id) {
    return this.Line.findById(id).populate("stops");
  }

  async findByCode(code) {
    return this.Line.findOne({ code });
  }

  async create(data) {
    return this.Line.create(data);
  }

  async save(line) {
    return line.save();
  }
}

export default LineRepository;
