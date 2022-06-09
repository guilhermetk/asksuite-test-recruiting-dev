const express = require('express');
const crawler = require('../crawler/crawler');
const dateUtil = require('../util/dateUtil');

const router = express.Router();

router.post('/buscar', async (req, res) => {
  const checkinDate = req.body.checkin;
  const checkoutDate = req.body.checkout;

  if (!checkinDate || !checkoutDate) {
    return res.status(400).send({ message: 'Check parameters', startDate: checkinDate === undefined ? null : checkinDate, endDate: checkoutDate === undefined ? null : checkoutDate });
  }
  //try {
    const hotels = await crawler(dateUtil.formatDate(checkinDate), dateUtil.formatDate(checkoutDate));
    res.status(200).send({ hotels });
  //} catch (error) {
  //  res.status(500).send({ message: 'Not possible to scrape data with given parameters', startDate: checkinDate, endDate: checkoutDate })
  //}
});

module.exports = router;
