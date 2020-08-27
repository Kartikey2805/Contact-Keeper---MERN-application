const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const path = require('path');

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set Static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
