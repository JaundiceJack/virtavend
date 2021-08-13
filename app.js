const express = require('express');
const mongoose = require('mongoose');

// Instance the app server and use the internal body parser
const app = express();
app.use(express.json());

// Connect to mongoDB
const mongoURI = require('./config/keys.js').mongoURI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then( () => console.log("Connected to mongoDB!"))
.catch( err => console.log(`DB Connection Error: ${err}`));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  });
};

// Start the server on the assigned port
const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server started on port ${port}`); });
