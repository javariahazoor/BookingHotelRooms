const { request } = require('express');
const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

//ROUTES

/* Get ALL HOTELS */
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        res.json({ message: error })
    }
})
/* INSERT HOTEL RECORDS */
router.post('/', async (req, res) => {
    const hotel = new Hotel({
        name: req.body.name,
        city: req.body.city,
        number_of_rooms: req.body.number_of_rooms,
        price: req.body.price,
    })
    try {
        const savedHotel = await hotel.save();
        res.json(savedHotel);
    } catch (err) {
        res.json({ message: error })
    }

});

/* GET SPECIFIC HOTEL DETAILS */
router.get('/:hotelId', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId);
        res.json(hotel);
    } catch (err) {
        res.json({ message: err })
    }
})

/* FILTER HOTELS */
router.get('/search/:city/:maxPrice', async (req, res) => {
    var sortWithPrice = { price: 1 };
    try {
        const filteredHotels = await Hotel.find({
            city: req.params.city   
        }).where('price').lt(req.params.maxPrice).sort(sortWithPrice);
        res.json(filteredHotels);
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router