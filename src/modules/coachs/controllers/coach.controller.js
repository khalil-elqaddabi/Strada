export default class CoachController {
  constructor(coachService) {
    this.coachService = coachService;
  }

  async create(req, res, next) {
    try {
      const coach = await this.coachService.create(req.body);

      res.status(201).json({ data: coach });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const coaches = await this.coachService.findAll();

      res.status(200).json({ data: coaches });
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const coach = await this.coachService.findById(
        req.params.id
      );

      res.status(200).json({ data: coach });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const coach = await this.coachService.update(
        req.params.id,
        req.body
      );

      res.status(200).json({ data: coach });
    } catch (error) {
      next(error);
    }
  }

  async archive(req, res, next) {
    try {
      await this.coachService.archive(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}