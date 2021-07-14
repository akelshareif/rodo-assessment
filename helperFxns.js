// Receives searchResults, filters and collates them
// Returns all models and their respective counts
// Results vary based on given searchResults
const colateModelsAndCount = (searchResults) => {
    let currModel = searchResults[0].model;
    let carTotal = 0;
    const carList = [];
    let years = [];

    searchResults.forEach((car) => {
        if (car.model !== currModel) {
            // Push current data
            if (carTotal > 0) {
                carList.push({ make: car.make, model: currModel, years, vehicle_count: carTotal });
            }

            // Reset
            currModel = car.model;
            carTotal = 0;
            years = [];
        } else {
            years.push(car.year);
            carTotal += car.vehicle_count;
        }
    });

    if (carList.length === 0) {
        searchResults.forEach((car) => {
            years.push(car.year);
            carTotal += car.vehicle_count;
        });
        carList.push({ make: searchResults[0].make, model: currModel, years, vehicle_count: carTotal });
    }

    return carList;
};

module.exports = {
    colateModelsAndCount,
};
