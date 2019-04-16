'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/location', (request, response) => {
    response.send(search_location(request.query.data));
})

app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

function search_location(front_end_query) {
    const search_query = front_end_query;

    const geo_data = require('./data/geo.json');
    const formatted_query = geo_data.results[0].formatted_address;
    const latitude = geo_data.results[0].geometry.location.lat;
    const longitude = geo_data.results[0].geometry.location.lng;

    const location_object = {search_query, formatted_query, latitude, longitude};

    return location_object;
}


app.listen(PORT,() => console.log(`Listening on port ${PORT}`));