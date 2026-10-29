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
// Coach
import Coach from "../modules/coachs/models/coach.model.js";
import CoachRepository from "../modules/coachs/repositories/coach.repository.js";
import CoachService from "../modules/coachs/services/coach.service.js";
import CoachController from "../modules/coachs/controllers/coach.controller.js";

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

  // Coach registrations
coachModel: asValue(Coach),
coachRepository: asClass(CoachRepository).scoped(),
coachService: asClass(CoachService).scoped(),
coachController: asClass(CoachController).scoped(),
});

export default container;
