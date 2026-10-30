import 'dotenv/config';
import mongoose from 'mongoose';

import { seedCities } from './city.seeder.js';
import { seedStops } from './stop.seeder.js';
import { seedLines } from './line.seeder.js';
import { seedCoaches } from './coach.seeder.js';
import { seedDepartures } from './departure.seeder.js';

async function runSeeders() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await seedCities();
    await seedStops();
    await seedLines();
    await seedCoaches();
    await seedDepartures();

    console.log('All seeders completed successfully');
  } catch (error) {
    console.error('Seeder error:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await runSeeders();