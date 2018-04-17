const mongoose  = require('mongoose');
const dotenv    = require('dotenv').load();

var db_url = ''

if(process.env.APP_ENV == 'development') {
    db_url = 'mongodb://localhost/blockchain'
} else {
    db_url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
}

mongoose.connect(db_url, function (err) {
    if(err) {
        console.error(`Error: ${err}`);
    } else {
        console.log("Connection Established with Database");
    }
});
