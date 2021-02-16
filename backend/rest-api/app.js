const express = require('express');
//executing express
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

//LISTENING TO THE SERVER
app.listen(8000)

//DB CONNECTIONS
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected…")
}).catch(err => console.log(err))

//HOME
app.get('/', (req, res) => {
    res.send('we are at home')
})

//MIDDLEWARES FOR SPECIFIC ROUTES
const hotelsRoute = require('./routes/hotels');
app.use('/hotels', hotelsRoute);

const customersRoute = require('./routes/customers');
app.use('/customers', customersRoute);

const bookingRoute = require('./routes/bookings');
app.use('/booking', bookingRoute);


