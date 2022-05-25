const route = require('express').Router();
const userRoutes = require('../routes/user.routes');


route.use('/user', userRoutes);
module.exports = route;