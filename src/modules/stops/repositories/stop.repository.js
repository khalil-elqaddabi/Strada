
export default class StopRepository {
  constructor({ stopModel }) {
    this.stopModel = stopModel;
  }

  async create(data) {
    return this.stopModel.create(data);
  }

  async findAll() {
    return this.stopModel.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return this.stopModel.findById(id);
  }

  async updateById(id, data) {
    return this.stopModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return this.stopModel.findByIdAndDelete(id);
  }
}
