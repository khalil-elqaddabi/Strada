export default class CoachController {
  constructor({ coachService }) {
    this.coachService = coachService;
  }

  async create(req, res, next) {
    try {
      const coach = await this.coachService.createCoach(
        req.body
      );

      return res.status(201).json({
        success: true,
        data: coach,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const coaches = await this.coachService.getAllCoaches();

      return res.status(200).json({
        success: true,
        data: coaches,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const coach = await this.coachService.getCoachById(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        data: coach,
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const coach = await this.coachService.updateCoach(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        data: coach,
      });
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const coach = await this.coachService.deleteCoach(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message: "Autocar archivé avec succès.",
        data: coach,
      });
    } catch (error) {
      return next(error);
    }
  }
}