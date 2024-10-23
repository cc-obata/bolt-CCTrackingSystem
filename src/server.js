const express = require('express');
const cors = require('cors');
const config = require('config');
const sequelize = require('./config/database');
const { logger, validateRequest } = require('./controllers/commonsController');
const { saveTrackingData } = require('./controllers/devicesController');
const { handleError } = require('./controllers/errorController');

const app = express();
const port = config.get('server.port');

app.use(cors());
app.use(express.json());
app.use(logger);

// API endpoint
app.post('/api/devices/trackingData', validateRequest, saveTrackingData);

// Error handling
app.use(handleError);

// Database initialization and server start
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });