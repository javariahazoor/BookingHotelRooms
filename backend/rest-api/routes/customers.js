const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

//ROUTES

/* Get ALL CUSTOMERS */
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.json({ message: err })
    }
})
/* INSERT CUSTOMER RECORD */
router.post('/', async (req, res) => {
    const customer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
    })
    try {
        const savedCustomer = await customer.save();
        res.json(savedCustomer);
    } catch (err) {
        res.json({ message: err })
    }
});

//GET SPECIFIC CUSTOMER DETAILS
router.get('/:customerId', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId);
        res.json(customer);
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router