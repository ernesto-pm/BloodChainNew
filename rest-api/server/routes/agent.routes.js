let router  =   require('express').Router();
const jsonParser = require('body-parser').json();
let AgentController = require('../controllers/agent.controller.js');

router.route('/agent')
    .get(jsonParser, AgentController.getAgents)
    .post(jsonParser, AgentController.createAgent);

module.exports = router;
