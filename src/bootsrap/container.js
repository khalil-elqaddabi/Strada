import { createContainer, asClass, asValue, InjectionMode } from "awilix";
// departure
import Departure from "../modules/departures/models/departure.model.js";
import DepartureRepository from "../modules/departures/repositories/departure.repositorie.js";
import DepartureService from "../modules/departures/services/departure.service.js";
import DepartureController from "../modules/departures/controllers/departure.controller.js";
// stops
import Stop from "../modules/stops/models/stop.model.js";
import StopRepository from "../modules/stops/repositories/stop.repository.js";
import StopService from "../modules/stops/services/stop.service.js";
import StopController from "../modules/stops/controllers/stop.controller.js";
//lines 
import Line from "../modules/lines/models/line.model.js";
import LineRepository from "../modules/lines/repositories/line.repository.js";
import LineService from "../modules/lines/v1/services/line.service.js";
import LineController from "../modules/lines/v1/controllers/line.controller.js";
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
    // Departure registrations

  departureModel: asValue(Departure),

  departureRepository: asClass(DepartureRepository).scoped(),

  departureService: asClass(DepartureService).scoped(),

  departureController: asClass(DepartureController).scoped(),

  // Stops registrations
  stopModel: asValue(Stop),
  stopRepository: asClass(StopRepository).scoped(),
  stopService: asClass(StopService).scoped(),
  stopController: asClass(StopController).scoped(),

  //lines 
  lineModel:      asValue(Line),
lineRepository: asClass(LineRepository).scoped(),
lineService:    asClass(LineService).scoped(),
lineController: asClass(LineController).scoped(),
});

export default container;
