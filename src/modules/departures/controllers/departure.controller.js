
export default class DepartureController {
  constructor({ departureService }) {
    this.departureService = departureService;
  }

  async create(req, res, next) {
    try {
      const departure =
        await this.departureService.createDeparture(req.body);

      return res.status(201).json({
        success: true,
        data: departure,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    console.log('1');
    try {
      const departures =
        await this.departureService.getAllDepartures();

      return res.status(200).json({
        success: true,
        data: departures,
      });
    } catch (error) {
        // console.log('err');
      return next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const departure =
        await this.departureService.getDepartureById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: departure,
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const departure =
        await this.departureService.updateDeparture(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        data: departure,
      });
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const departure =
        await this.departureService.deleteDeparture(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        message: 'Départ supprimé avec succès',
        data: departure,
      });
    } catch (error) {
      return next(error);
    }
  }
}
