// what you need for routes
const express = require('express');
const router = express.Router();

// logout
router.post('/', (req, res) => {
    //Check use logged in
    if (req.session.user == null) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    //Check if hours are empty
    if (req.body.timein == null && req.body.timeout == null && req.body.mealin == null && req.body.mealout == null) {
        return res.status(422).json({
            message: 'Please enter your hours',
        });
    }

    console.log(`timein: ${req.body.timein}; timeout: ${req.body.timeout}; mealin: ${req.body.mealin}; mealout: ${req.body.mealout}`);
    for (var i in req.session.user) {
        console.log(`${i}`)
    }

    res.status(200).json({
        message: 'Hours logged',
    });
});


module.exports = router;