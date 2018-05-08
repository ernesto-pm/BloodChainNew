let agent       = require('./routes/agent.routes');
let blockchain  = require('./routes/blockchain.routes');
let donation    = require('./routes/donation.routes')

let api_routes = function(app){
    app.use('/api/', agent);
    app.use('/api/', blockchain)
    app.use('/api/', donation)
};

module.exports = api_routes;
