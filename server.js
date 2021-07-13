const carsData = require('./carsData');

// Exporting a function which returns the car data as an object
// Allows for all car data to live in memory
// Prevents any data mutation from POST/PUT/PATCH/DELETE requests
// Preverses immutability of the data file

module.exports = () => carsData;
