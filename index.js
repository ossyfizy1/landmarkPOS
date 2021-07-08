const express = require('express');
const app = express();

// require local environment file .env
var dotenv = require("dotenv");
dotenv.config();

// require landingPage routes
var landingPage = require("./routes/landingPage_routes");

// require the path module
var path = require("path");

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var bodyParser = require("body-parser");
// require express-session
var session = require("express-session");

// set up the view engine
app.set("view engine", "ejs");

// for public content
app.use(express.static(path.join(__dirname) + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// use session as middleware
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}
    
// using session as middleware
app.use(session({secret: 'ssshhhhh', resave: true, saveUninitialized: true}));

// landingPage routes
app.use(landingPage);

// start server to listen on given port 
var server = app.listen( process.env.PORT || 9500, function () {
    var host = server.address().address
    var port = server.address().port;
    console.log("Mobile POS started at http://%s:%s", host, port);
});