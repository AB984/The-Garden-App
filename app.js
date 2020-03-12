require('dotenv').config();
// const key = 'M0RnR3hmWTl1aFpCdk9hM2F1MzVEZz09';  // personal authority to access trefle data
// const clientURL = 'http://localhost:3001/'

var express = require('express');
var app = express();

var trefle = require('./controllers/treflecontroller');
var plant = require('./controllers/plantcontroller')
var user = require('./controllers/usercontroller');

app.use(require('./middleware/headers'));

const sequelize = require("./db")
sequelize.sync();
// sequelize.sync({force: true});
app.use(express.json())

app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/api', trefle);
app.use('/plant', plant);
// app.use('/api', (req, res) => {
//     res.send("This is data from the /api endpoint from the server (app.js)")
// })

app.listen(process.env.PORT, ()=> console.log(`app is listening on ${process.env.PORT}`));

// app.listen(3000, function() {console.log('App is actively listening on 3000.')})