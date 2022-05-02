const express = require('express');
const router = express.Router();
const RatingsModel = require('../Models/Ratings');

router.post('/addRating', async(req, res) => {
    try {
        await RatingsModel.create({
            rating:req.body.currentValue
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})

module.exports = router;