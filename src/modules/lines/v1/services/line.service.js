class LineService {
  constructor({ lineRepository, stopModel }) {
    this.lineRepository = lineRepository;
    this.Stop = stopModel;
  }

  async getAll({ page = 1, limit = 20 }) {
    const { data, total } = await this.lineRepository.findAll({ page, limit });
    return { data, pagination: { page, limit, total } };
  }

  async create({ code, label, stopIds }) {
    const normalizedCode  = code.trim().toUpperCase();
    const normalizedLabel = label.trim();

    const exists = await this.lineRepository.findByCode(normalizedCode);
    if (exists) {
      const err = new Error("Line code already in use.");
      err.code = "RESOURCE_CONFLICT"; err.status = 409; throw err;
    }

    const stops = await this.Stop.find({ _id: { $in: stopIds } });
    if (stops.length !== stopIds.length) {
      const foundIds = stops.map(s => s._id.toString());
      const notFound = stopIds.filter(id => !foundIds.includes(id));
      const err = new Error(`Stops not found: ${notFound.join(", ")}`);
      err.code = "RESOURCE_NOT_FOUND"; err.status = 404; throw err;
    }

    return this.lineRepository.create({ code: normalizedCode, label: normalizedLabel, stops: stopIds });
  }

  async update(id, { code, label, stopIds }) {
    const line = await this.lineRepository.findById(id);
    if (!line || line.isArchived) {
      const err = new Error("Line not found.");
      err.code = "RESOURCE_NOT_FOUND"; err.status = 404; throw err;
    }

    if (code) {
      const normalizedCode = code.trim().toUpperCase();
      const exists = await this.lineRepository.findByCode(normalizedCode);
      if (exists && exists._id.toString() !== id) {
        const err = new Error("Line code already in use.");
        err.code = "RESOURCE_CONFLICT"; err.status = 409; throw err;
      }
      line.code = normalizedCode;
    }

    if (label) line.label = label.trim();

    if (stopIds) {
      const stops = await this.Stop.find({ _id: { $in: stopIds } });
      if (stops.length !== stopIds.length) {
        const foundIds = stops.map(s => s._id.toString());
        const notFound = stopIds.filter(id => !foundIds.includes(id));
        const err = new Error(`Stops not found: ${notFound.join(", ")}`);
        err.code = "RESOURCE_NOT_FOUND"; err.status = 404; throw err;
      }
      line.stops = stopIds;
    }

    return this.lineRepository.save(line);
  }

  async archive(id) {
    const line = await this.lineRepository.findById(id);
    if (!line) {
      const err = new Error("Line not found.");
      err.code = "RESOURCE_NOT_FOUND"; err.status = 404; throw err;
    }
    line.isArchived = true;
    return this.lineRepository.save(line);
  }
}

export default LineService;
