import {createContainer, asClass, asValue, InjectionMode} from 'awilix';

import Departure from '../modules/departures/models/departure.model.js';
import DepartureRepository from '../modules/departures/repositories/departure.repositorie.js';
import DepartureService from '../modules/departures/services/departure.service.js';
import DepartureController from '../modules/departures/controllers/departure.controller.js';


const container = createContainer({
    injectionMode: InjectionMode.PROXY, 
});

container.register({
    departureModel: asValue(Departure),

    departureRepository: asClass(DepartureRepository).scoped(),

    departureService: asClass(DepartureService).scoped(),

    departureController: asClass(DepartureController).scoped(),
})

export default container;