import mongoose from "mongoose";
import stopRepository from "../repositories/stop.repository";

class StopService {
  async create(data) {
    return stopRepository.create(data);
  }

  async findAll() {
    return stopRepository.findAll();
  }

  async findById(id) {
    this.validateId(id);

    const stop = await StopRepository.findById(id);

    if (!stop) {
      const err = new Error("Stop not found");
      err.code = "Re  SOURCE NOT FOUND";
      err.status = 404;
      throw err;
    }
    return stop;
  }

  async update(id, data) {
    this.validateId(id);

    const stop = await StopRepository.updateById(id, data);

    if (!stop) {
      const err = new Error("Stop not found");
      err.code = "Re  SOURCE NOT FOUND";
      err.status = 404;
      throw err;
    }
    return stop;
  }

  async delete(id) {
    this.validateId(id);

    const stop = await StopRepository.deleteById(id);

    if (!stop) {
      const err = new Error("Stop not found.");
      err.code = "RESOURCE_NOT_FOUND";
      err.status = 404;
      throw err;
    }

    return stop;
  }

  validateId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      const err = new Error("Invalid stop ID.");
      err.code = "INVALID_ID";
      err.status = 400;
      throw err;
    }
  }
}

export default new StopService();
