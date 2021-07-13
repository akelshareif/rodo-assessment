const express = require('express');
const axios = require('axios');
const router = express.Router();
const ExpressError = require('./ExpressError');

/** Functionality and routes
 * Text full and partial search: /cars?{property}_like=^{searchText}.*
 * GET / - returns all cars
 * /search - takes in query string params for search functionality
 * - returns total # of matched available cars, # of matched cars by Make & Model combo only, and min, median, & max price of matched vehicle
 */

// Data will come from a form, so plan accordingly to properly handle it

// Root route is for testing purposes - Not needed as part of API
router.get('/', async (req, res, next) => {
    try {
        res.send('This is working');
    } catch (err) {
        return next(err);
    }
});

// Search route
router.get('/search', async (req, res, next) => {
    try {
        // Get search data from req.body
        const { make, model, year } = req.body;

        const { data } = await axios.get(`http://localhost:3004/testData/${req.params.id}`);

        return res.json(data);
    } catch (err) {
        return next(err);
    }
});

router.post('/', async (req, res) => {
    const { id, name, age } = req.body;

    await axios.post(`http://localhost:3004/testData`, { id, name, age });

    return res.status(201).json({ msg: 'Message created' });
});

module.exports = router;
