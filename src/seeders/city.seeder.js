
import City from '../modules/citys/models/city.model.js';

const citiesData = [
  { name: 'Casablanca' },
  { name: 'Rabat' },
  { name: 'Marrakech' },
  { name: 'Agadir' },
  { name: 'Fes' },
];

export async function seedCities() {
  for (const city of citiesData) {
    await City.updateOne(
      { name: city.name },
      { $setOnInsert: city },
      { upsert: true, runValidators: true }
    );
  }

  console.log('Cities seeded successfully');
}
