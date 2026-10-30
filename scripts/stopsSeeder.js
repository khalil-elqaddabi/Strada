import "dotenv/config";
import mongoose from "mongoose";
import City from "../src/modules/citys/models/city.model.js";
import Stop from "../src/modules/stops/models/stop.model.js";

const cities = [
  { name: "Casablanca" },
  { name: "Rabat" },
  { name: "Marrakech" },
  { name: "Fes" },
  { name: "Tanger" },
  { name: "Agadir" },
  { name: "Meknes" },
  { name: "Oujda" },
  { name: "Youssoufia" },
  { name: "Safi" },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");

  await City.deleteMany({});
  await Stop.deleteMany({});

  const insertedCities = await City.insertMany(cities);
  console.log(`${insertedCities.length} cities inserted`);

  const cityMap = {};
  insertedCities.forEach((c) => (cityMap[c.name] = c._id));

  const stops = [
    { name: "Gare Routière Casa", cityId: cityMap["Casablanca"] },
    { name: "Oulad Ziane", cityId: cityMap["Casablanca"] },
    { name: "Gare Routière Rabat", cityId: cityMap["Rabat"] },
    { name: "Agdal", cityId: cityMap["Rabat"] },
    { name: "Gare Routière Marrakech", cityId: cityMap["Marrakech"] },
    { name: "Bab Doukkala", cityId: cityMap["Marrakech"] },
    { name: "Gare Routière Fes", cityId: cityMap["Fes"] },
    { name: "Gare Routière Tanger", cityId: cityMap["Tanger"] },
    { name: "Gare Routière Agadir", cityId: cityMap["Agadir"] },
    { name: "Gare Routière Meknes", cityId: cityMap["Meknes"] },
    { name: "Gare Routière Oujda", cityId: cityMap["Oujda"] },
    { name: "Gare Routière Youssoufia", cityId: cityMap["Youssoufia"] },
    { name: "Gare Routière Safi", cityId: cityMap["Safi"] },
  ];

  const insertedStops = await Stop.insertMany(stops);
  console.log(`${insertedStops.length} stops inserted`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
