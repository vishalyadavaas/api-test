const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
// Middlewares
app.use(express.json());

//routes imports
const userRoutes = require('./routes/user.routes')

// routes declaration
app.use('/',userRoutes)
module.exports = app