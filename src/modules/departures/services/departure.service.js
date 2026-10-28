

export default class DepartureService {
  constructor({ departureRepository }) {
    this.departureRepository = departureRepository;
  }

  async createDeparture(data) {
    return this.departureRepository.create(data);
  }

  async getAllDepartures() {
    return this.departureRepository.findAll();
  }

  async getDepartureById(id) {
    const departure =
      await this.departureRepository.findById(id);

    if (!departure) {
      const error = new Error('Départ introuvable');
      error.statusCode = 404;
      throw error;
    }

    return departure;
  }

  async updateDeparture(id, data) {
    const departure =
      await this.departureRepository.updateById(id, data);

    if (!departure) {
      const error = new Error('Départ introuvable');
      error.statusCode = 404;
      throw error;
    }

    return departure;
  }

  async deleteDeparture(id) {
    const departure =
      await this.departureRepository.delete(id);

    if (!departure) {
      const error = new Error('Départ introuvable');
      error.statusCode = 404;
      throw error;
    }

    return departure;
  }
}
