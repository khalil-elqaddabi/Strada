import { createContainer, asClass, asValue, InjectionMode } from "awilix";
import registerLines from "../modules/lines/line.container.js";
import registerDepartures from '../modules/departures/departure.container.js';
import registerBookings from '../modules/bookings/booking.container.js';

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
// Departures
registerDepartures(container);
//lines
registerLines(container);
registerBookings(container);


container.register({
  stopModel:       asValue(Stop),
  stopRepository:  asClass(StopRepository).scoped(),
  stopService:     asClass(StopService).scoped(),
  stopController:  asClass(StopController).scoped(),
  coachModel:      asValue(Coach),

});


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
