class LineController {
  constructor({ lineService }) {
    this.lineService = lineService;
  }

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const result = await this.lineService.getAll({ page: +page, limit: +limit });
      res.status(200).json(result);
    } catch (err) { next(err); }
  }

  async create(req, res, next) {
    try {
      const line = await this.lineService.create(req.body);
      res.status(201).json({ data: line });
    } catch (err) { next(err); }
  }

  async update(req, res, next) {
    try {
      const line = await this.lineService.update(req.params.id, req.body);
      res.status(200).json({ data: line });
    } catch (err) { next(err); }
  }

  async archive(req, res, next) {
    try {
      await this.lineService.archive(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  }
}

export default LineController;
