
import { asClass, asValue } from 'awilix';

import Departure from './models/departure.model.js';
import DepartureRepository from './repositories/departure.repositorie.js';
import DepartureService from './services/departure.service.js';
import DepartureController from './controllers/departure.controller.js';

export default function registerDepartures(container) {
    container.register({
        departureModel: asValue(Departure),

        departureRepository: asClass(DepartureRepository).scoped(),

        departureService: asClass(DepartureService).scoped(),

        departureController: asClass(DepartureController).scoped(),
    });
}
