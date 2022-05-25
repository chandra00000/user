require('rootpath')();

// const http = require('http');

const serverless = require('serverless-http');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRouts = require('./src/routes/index')






app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization', 'Origin', 'X-Requested-With', 'Accept');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//   });

app.use(cors());

const db = require("./src/models");
db.sequelize.sync();

db.sequelize.sync();

//api route

app.use('/api', indexRouts);



// global error handler
// app.use(errorHandler);

// require("./src/routes/users.routes")(app);

// app.get('/', function(req, res) {
//     res.send('Hello World!')
// })



// require("./src/routes/users.routes")(app);


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3080;
app.listen(port, () => console.log('Server listening on port ' + port));






module.exports.handler = serverless(app)