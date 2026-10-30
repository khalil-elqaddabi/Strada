import Departure from '../modules/departures/models/departure.model.js';
import Line from '../modules/lines/models/line.model.js';
import Coach from '../modules/coachs/models/coach.model.js';

export async function seedDepartures() {
  const line = await Line.findOne({ code: 'L001' });
  const coach = await Coach.findOne({ registration: 'COACH-001' });

  if (!line || !coach) {
    throw new Error('A valid line and coach are required before seeding departures.');
  }

  const departureData = {
    lineId: line._id,
    coachId: coach._id,
    departureAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    arrivalAt: new Date(Date.now() + 4.5 * 60 * 60 * 1000),
    price: 120,
    status: 'OPEN',
  };

  const departure = await Departure.findOneAndUpdate(
    { lineId: line._id, coachId: coach._id, departureAt: departureData.departureAt },
    { $setOnInsert: departureData },
    { upsert: true, new: true, runValidators: true }
  );

  console.log('Departure seeded successfully:', departure._id.toString());
  return departure;
}
