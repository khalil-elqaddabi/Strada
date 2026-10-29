
export default class StopController {
  constructor({ stopService }) {
    this.stopService = stopService;
  }

  async create(req, res, next) {
    try {
      const stop = await this.stopService.createStop(req.body);

      return res.status(201).json({
        success: true,
        data: stop,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const stops = await this.stopService.getAllStops();

      return res.status(200).json({
        success: true,
        data: stops,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const stop = await this.stopService.getStopById(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        data: stop,
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const stop = await this.stopService.updateStop(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        data: stop,
      });
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const stop = await this.stopService.deleteStop(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message: "Stop supprimé avec succès",
        data: stop,
      });
    } catch (error) {
      return next(error);
    }
  }
}
