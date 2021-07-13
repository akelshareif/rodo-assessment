const colateModelsAndCount = (searchResults) => {
    let currModel = '';
    let carTotal = 0;
    const carList = [];

    searchResults.forEach((car) => {
        if (car.model !== currModel) {
            // Push current data
            if (carTotal > 0) {
                carList.push({ make: car.make, model: currModel, vehicle_count: carTotal });
            }

            // Reset
            currModel = car.model;
            carTotal = 0;
        } else {
            carTotal += car.vehicle_count;
        }
    });

    return carList;
};

module.exports = {
    colateModelsAndCount,
};
