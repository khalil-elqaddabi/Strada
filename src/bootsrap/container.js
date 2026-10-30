import { createContainer, asClass, asValue, InjectionMode } from "awilix";
import registerLines from "../modules/lines/line.container.js";
import registerDepartures from '../modules/departures/departure.container.js';
import registerBookings from '../modules/bookings/booking.container.js';

// stops
import Stop from "../modules/stops/models/stop.model.js";
import StopRepository from "../modules/stops/repositories/stop.repository.js";
import StopService from "../modules/stops/services/stop.service.js";
import StopController from "../modules/stops/controllers/stop.controller.js";
import Coach from "../modules/coachs/models/coach.model.js";
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



export default container;
