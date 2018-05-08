const router                = require('express').Router();
const jsonParser            = require('body-parser').json();
const DonationController    = require('../controllers/donation.controller');

router.route('/donation')
    .post(jsonParser, DonationController.createDonation);


router.route('/owner_donations')
    .post(jsonParser, DonationController.getDonations);

module.exports = router;
