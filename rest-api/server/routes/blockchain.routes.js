let router  =   require('express').Router();
const jsonParser = require('body-parser').json();
let BlockchainController = require('../controllers/blockchain.controller');

router.route('/blockchain/decodeBlock')
    .post(jsonParser, BlockchainController.decodeBlock);

module.exports = router;
