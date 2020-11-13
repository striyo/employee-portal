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
    if (!req.body.timein && !req.body.timeout && !req.body.mealin && !req.body.mealout) {
        return res.status(422).json({
            message: 'Please enter your hours',
        });
    }

    res.status(200).json({
        message: 'Hours logged',
    });
});


module.exports = router;