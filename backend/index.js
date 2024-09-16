require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection (add connection code here)
require('./config/database');

//routes
require('./routes')(app);
app.use('/', (req, res) => res.send("hello"))

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})