const express = require('express');
var cors = require('cors');

//Load environment file
require('dotenv').config();

//Load database config
require('./config/db');

const apiRoutes = require('./routes/Api');
const app = express();
app.use(express.json());
app.use(cors());

//API routes
app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Listen on the port ' + process.env.PORT + '...');
});
