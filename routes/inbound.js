const express = require('express');
const { route } = require('express/lib/application');
const crawler = require('../controller/crawler');

const router = express.Router();

router.post('/buscar', async (req, res, next) => {
    const checkinDate = req.body.checkin;
    const chakoutDate = req.body.checkout;

    if (!checkinDate || !chakoutDate) {
        return res.status(400).send({ "message": "Check parameters", "startDate": checkinDate === undefined ? null : checkinDate, "endDate": chakoutDate === undefined ? null : chakoutDate });
    }

    const data = await crawler(checkinDate, chakoutDate);
    res.status(200).send({ "message": "Success", "startDate": checkinDate, "endDate": chakoutDate , response : data });
});

module.exports = router;