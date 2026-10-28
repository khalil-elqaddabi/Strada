
import Coach from '../modules/coachs/models/coach.model.js';

const coachesData = [
  {
    registration: 'COACH-001',
    seatNumbers: Array.from(
      { length: 40 },
      (_, index) => index + 1
    ),
  },
  {
    registration: 'COACH-002',
    seatNumbers: Array.from(
      { length: 30 },
      (_, index) => index + 1
    ),
  },
  {
    registration: 'COACH-003',
    seatNumbers: Array.from(
      { length: 50 },
      (_, index) => index + 1
    ),
  },
];

export async function seedCoaches() {
  for (const coach of coachesData) {
    await Coach.updateOne(
      { registration: coach.registration },
      { $setOnInsert: coach },
      { upsert: true, runValidators: true }
    );
  }

  console.log('Coaches seeded successfully');
}
