const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

//ROUTES

/* Get ALL BOOKINGS */
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.json({ message: err })
    }
})
/* Filter BOOKINGS BETWEEN ARRIVAL AND DEPARTURE DATES */
router.get('/range', async (req, res) => {
    try {
        const bookings = await Booking.find({
            "arrival_date": { "$gte": req.query.arrival_date },
            "departure_date": { "$lte": req.query.departure_date } 
            }
        );
        res.json(bookings);
    } catch (err) {
        res.json({ message: err })
    }
})
/* INSERT BOOKING RECORD */
router.post('/', async (req, res) => {
    const booking = new Booking({
        customer_id: req.body.customer_id,
        hotel_id: req.body.hotel_id,
        arrival_date: req.body.arrival_date,
        departure_date: req.body.departure_date,
        number_of_rooms: req.body.number_of_rooms
    })
    try {
        const savedBooking = await booking.save();
        res.json(savedBooking);
    } catch (err) {
        res.json({ message: err })
    }
});



module.exports = router