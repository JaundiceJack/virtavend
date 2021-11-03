const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connect = require('./db/connection.js');
const { notFound, errorFound } = require('./middleware/errorMW.js')
dotenv.config();

// Instance the app server and use the internal body parser
const app = express();
app.use(express.json());

// Instance a mongoDB connection
connect();

// Define routes
app.use('/api/products', require('./routes/paths/products.js'));
app.use('/api/orders', require('./routes/paths/orders.js'));
app.use('/api/user', require('./routes/paths/user.js'));

// Set the PayPal ID route
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// Error handling middleware
app.use(notFound);
app.use(errorFound);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  });
};
//
// Start the server on the assigned port
const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server started on port ${port}`); });
