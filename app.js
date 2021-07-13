const express = require('express');
const ExpressError = require('./ExpressError');
const carRoutes = require('./carsRoutes');

const app = express();

// Middleware to parse both form and JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res, next) => {
    return res.send('Home Page');
});

// Consuming imported routes
app.use('/cars', carRoutes);

// 404 Error Handler
app.use((req, res, next) => {
    const err = new ExpressError('Not Found', 404);
    return next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
    // Get passed status code or default to 500 Internal Server Error
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

// Binds server to port 3000 and listens for requests
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
