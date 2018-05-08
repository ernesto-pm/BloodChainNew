require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride    = require('method-override');
const routes            = require('./server/routes');
const PORT = process.env.PORT || 8080;
require('./server/config/db');
require('./server/config/passport');

app.all('*', function(req,res,next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   next();
});
app.use(methodOverride("X-HTTP-Method-Override"));
routes(app);

app.listen(PORT,()=>{
    console.log('Server running on Port '+ PORT);
});
