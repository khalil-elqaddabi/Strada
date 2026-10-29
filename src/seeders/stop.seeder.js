
import City from '../modules/citys/models/city.model.js';
import Stop from '../modules/stops/models/stop.model.js';

const stopsData = [
  { name: 'Casa Voyageurs', city: 'Casablanca' },
  { name: 'Rabat Centre', city: 'Rabat' },
  { name: 'Marrakech Station', city: 'Marrakech' },
  { name: 'Agadir Centre', city: 'Agadir' },
  { name: 'Fes Station', city: 'Fes' },
];

export async function seedStops() {
  for (const item of stopsData) {
    const city = await City.findOne({ name: item.city });

    if (!city) {
      throw new Error(`City not found: ${item.city}`);
    }

    await Stop.updateOne(
      { name: item.name, cityId: city._id },
      {
        $setOnInsert: {
          name: item.name,
          cityId: city._id,
        },
      },
      { upsert: true, runValidators: true }
    );
  }

  console.log('Stops seeded successfully');
}
