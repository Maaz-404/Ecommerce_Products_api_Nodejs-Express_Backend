// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();
//Enable CORS
const cors = require('cors');
app.use(cors());

// Import routes
let apiRoutes = require("./api-routes");

let adminRoute = require("./admin-route");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true}, {useUnifiedTopology: true} );

// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf@ds349857.mlab.com:49857/heroku_5686p02g', { useNewUrlParser: true });

var db = mongoose.connection;

// Added check for DB connection

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// enable CORS without external module
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Use Admin Route in app - When written in a modular way
app.use('/admin', adminRoute)

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running ProductHub on port " + port);
});
