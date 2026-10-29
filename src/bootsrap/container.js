import {createContainer, asClass, asValue, InjectionMode} from 'awilix';

import registerDepartures from '../modules/departures/departure.container.js';


const container = createContainer({
    injectionMode: InjectionMode.PROXY, 
});

registerDepartures(container);

export default container;