const mongoose = require('mongoose');
const mongoDB_Url = process.env.MONGODB_URL;

mongoose.connect(mongoDB_Url);

//Event listeners
mongoose.connection.on('connected', (res) => console.log(res));
mongoose.connection.on('error', (err) => console.log(err));
