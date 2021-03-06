'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

function Geo_data_object(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.latitude = latitude;
  this.longitude = longitude;
}

function Weather_data_object(forecast, time) {
  this.forecast = forecast;
  this.time = new Date(time);
}

app.get('/location', (request, response) => {
  response.send(search_location(request.query.data));
})

app.get('/weather', (request, response) => {
  response.send(search_weather());
})

app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

function search_location(front_end_query) {
  const search_query = front_end_query;

  const geo_data = require('./data/geo.json');
  const formatted_query = geo_data.results[0].formatted_address;
  const latitude = geo_data.results[0].geometry.location.lat;
  const longitude = geo_data.results[0].geometry.location.lng;

  const location_object = new Geo_data_object(search_query, formatted_query, latitude, longitude);

  return location_object;
}

function search_weather() {
  const weather_data = require('./data/darksky.json');
  const weather_array = [];


  for (let i = 0; i < 8; i++) {
    const forecast = weather_data.daily.data[i].summary;
    const time = weather_data.daily.data[i].time;
    weather_array.push(new Weather_data_object(forecast, time));
  }

  // [{
  //   'forecast': 'Partly cloudy until afternoon.',
  //   'time': 'Mon Jan 01 2001'
  // },
  // {
  //   'forecast': 'Mostly cloudy in the morning.',
  //   'time': 'Tue Jan 02 2001'
  // }
  // ];

  return weather_array;
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
