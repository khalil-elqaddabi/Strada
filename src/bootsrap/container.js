import { createContainer, asClass, asValue, InjectionMode } from "awilix";

import registerDepartures from "../modules/departures/departure.container.js";
import registerLines from "../modules/lines/line.container.js";

// stops
import Stop from "../modules/stops/models/stop.model.js";
import StopRepository from "../modules/stops/repositories/stop.repository.js";
import StopService from "../modules/stops/services/stop.service.js";
import StopController from "../modules/stops/controllers/stop.controller.js";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

registerDepartures(container);
registerLines(container);

container.register({
  stopModel:       asValue(Stop),
  stopRepository:  asClass(StopRepository).scoped(),
  stopService:     asClass(StopService).scoped(),
  stopController:  asClass(StopController).scoped(),
});

export default container;
