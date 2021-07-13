const express = require('express');
const axios = require('axios');
const router = express.Router();
const { colateModelsAndCount } = require('./helperFxns');

// Root route
router.get('/', async (req, res, next) => {
    try {
        res.send('This is working');
    } catch (err) {
        return next(err);
    }
});

// Search route
router.post('/', async (req, res, next) => {
    try {
        // Get search data from req.body
        const { make, model, year, budget } = req.body;

        // Retreieve search data from mock database via full text search and Regex matching
        // If this were a real database, then asynchronous database queries would be placed here instead
        const { data } = await axios.get(
            `http://localhost:3004/cars?make_like=^${make || ''}.*&model_like=^${model || ''}.*`
        );

        // Following data is gathered from filtering and reducing the above response
        // This prevents making multiple requests to the server to retrieve the following results

        // Total num of available vehicles matched only via Make and Model
        const totalNumMatchedMakesModels = data.reduce((total, car) => {
            total += car.vehicle_count;
            return total;
        }, 0);

        // List of available vehicles matched with all included search terms
        const facetedSearchMatch = data.filter((car) => {
            if (car.price <= (budget || Infinity)) {
                // If a year is provided, then return only cars from that year within budget
                if (year) {
                    if (car.year == year) {
                        return car;
                    }
                } else {
                    // Else, return all cars within budget
                    return car;
                }
            }
        });

        // Filter and colate vehicle models and count
        const colatedResults = colateModelsAndCount(facetedSearchMatch);

        // Total number of vehciles matched with all included search terms
        const totalNumFacetedSearchMatch = facetedSearchMatch.reduce((total, car) => {
            total += car.vehicle_count;
            return total;
        }, 0);

        // Lowest, Median and Highest matched prices with given budget
        const lowestPrice = facetedSearchMatch.reduce((minPrice, car) => {
            minPrice = Math.min(minPrice, car.price);
            return minPrice;
        }, Infinity);

        // Median is rounded to the nearest hundredth decimal place
        const medianPrice =
            Math.round(
                (facetedSearchMatch.reduce((totalPrice, car) => {
                    totalPrice += car.price;
                    return totalPrice;
                }, 0) /
                    facetedSearchMatch.length) *
                    100
            ) / 100;

        const highestPrice = facetedSearchMatch.reduce((maxPrice, car) => {
            maxPrice = Math.max(maxPrice, car.price);
            return maxPrice;
        }, -Infinity);

        // Requested results will be formated and returned as JSON
        return res.json({
            colatedResults,
            totalNumFacetedSearchMatch,
            lowestPrice,
            medianPrice,
            highestPrice,
        });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
