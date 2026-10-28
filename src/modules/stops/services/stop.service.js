
import mongoose from "mongoose";

export default class StopService {
  constructor({ stopRepository }) {
    this.stopRepository = stopRepository;
  }

  async createStop(data) {
    return this.stopRepository.create(data);
  }

  async getAllStops() {
    return this.stopRepository.findAll();
  }

  async getStopById(id) {
    this.validateId(id);

    const stop = await this.stopRepository.findById(id);

    if (!stop) {
      const error = new Error("Stop introuvable");
      error.statusCode = 404;
      throw error;
    }

    return stop;
  }

  async updateStop(id, data) {
    this.validateId(id);

    const stop = await this.stopRepository.updateById(id, data);

    if (!stop) {
      const error = new Error("Stop introuvable");
      error.statusCode = 404;
      throw error;
    }

    return stop;
  }

  async deleteStop(id) {
    this.validateId(id);

    const stop = await this.stopRepository.delete(id);

    if (!stop) {
      const error = new Error("Stop introuvable");
      error.statusCode = 404;
      throw error;
    }

    return stop;
  }

  validateId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      const error = new Error("ID de stop invalide");
      error.statusCode = 400;
      throw error;
    }
  }
}
