
import Stop from '../modules/stops/models/stop.model.js';
import Line from '../modules/lines/models/line.model.js';

const linesData = [
  {
    code: 'L001',
    label: 'Casablanca - Rabat',
    stops: ['Casa Voyageurs', 'Rabat Centre'],
  },
  {
    code: 'L002',
    label: 'Casablanca - Marrakech - Agadir',
    stops: [
      'Casa Voyageurs',
      'Marrakech Station',
      'Agadir Centre',
    ],
  },
  {
    code: 'L003',
    label: 'Rabat - Fes',
    stops: ['Rabat Centre', 'Fes Station'],
  },
];

export async function seedLines() {
  for (const item of linesData) {
    const stops = await Stop.find({
      name: { $in: item.stops },
    });

    const stopsByName = new Map(
      stops.map((stop) => [stop.name, stop])
    );

    const missingStops = item.stops.filter(
      (name) => !stopsByName.has(name)
    );

    if (missingStops.length > 0) {
      throw new Error(
        `Stops not found: ${missingStops.join(', ')}`
      );
    }

    const stopIds = item.stops.map(
      (name) => stopsByName.get(name)._id
    );

    await Line.updateOne(
      { code: item.code },
      {
        $set: {
          label: item.label,
          stops: stopIds,
        },
        $setOnInsert: {
          code: item.code,
        },
      },
      { upsert: true, runValidators: true }
    );
  }

  console.log('Lines seeded successfully');
}
