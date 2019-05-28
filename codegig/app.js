const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// database
const db = require('./config/database');
// Test Connection
db.authenticate()
  .then(() => console.log('database connected...'))
  .catch(err => console.log('Error' + err));

const app = express();

// HandleBars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', {layout: 'landing'}));

app.get("/", (req, res) => res.send('INDEX'));

// gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
