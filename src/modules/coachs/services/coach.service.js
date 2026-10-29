import mongoose from "mongoose";

export default class CoachService {
  constructor({ coachRepository }) {
    this.coachRepository = coachRepository;
  }

  checkId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      const error = new Error("Invalid coach ID.");
      error.status = 400;
      error.code = "VALIDATION_ERROR";
      throw error;
    }
  }

  checkFound(coach) {
    if (!coach) {
      const error = new Error("Coach not found.");
      error.status = 404;
      error.code = "RESOURCE_NOT_FOUND";
      throw error;
    }

    return coach;
  }

  createCoach(data) {
    return this.coachRepository.create(data);
  }

  getAllCoaches() {
    return this.coachRepository.findAll();
  }

  async getCoachById(id) {
    this.checkId(id);

    const coach = await this.coachRepository.findById(id);

    return this.checkFound(coach);
  }

  async updateCoach(id, data) {
    this.checkId(id);

    const coach = await this.coachRepository.updateById(
      id,
      data
    );

    return this.checkFound(coach);
  }

  async deleteCoach(id) {
    this.checkId(id);

    const coach = await this.coachRepository.delete(id);

    return this.checkFound(coach);
  }
}