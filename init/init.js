const mongoose = require("mongoose");
const sampleData = require("./sampleListings.js");
const Toy = require("../models/listing.js");

//++++++++++++++++(let's connect our database)++++++++++++++++++++++

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Zappy");
}

main()
  .then(() => {
    console.log("Zappy connected successfully");
  })
  .catch((error) => {
    console.log("Zappy failed to connect", error.message);
  });

//++++++++++++++++(let's initialize our database with some toys!!!)++++++++++++++++++++++

async function initDB() {
  await Toy.deleteMany({});
  await Toy.insertMany(sampleData.data);
  console.log("data inserted successfully!");
}

initDB();
