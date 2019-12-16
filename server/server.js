const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

// Fetch API key from '.env' file
require('dotenv').config();

// Initialize express application
const app = express();

app.use(morgan('tiny'));
app.use(cors());

/**
 * @route GET /videos
 * @desc Get YouTube API search results
 */
app.get('/videos', (req, res) => {
    const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=metallica&type=video";
    fetch(`${url}&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => response.json())
    .then(json => {
        res.json(json.items);
    });
});

function notFound(req, res) {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
}

function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message
    });
}

app.use(notFound);
app.use(errorHandler);

// Connection listener
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});