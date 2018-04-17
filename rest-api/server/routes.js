let agent   = require('./routes/agent.routes');
let blockchain = require('./routes/blockchain.routes');

let api_routes = function(app){
    app.use('/api/', agent);
    app.use('/api/', blockchain)
};

module.exports = api_routes;
