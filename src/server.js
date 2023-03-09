const express = require('express');
const cors = require('cors');
// Routers
const contentTypeRouter = require('./routes/contentTypeRoutes');

// Constants
const PORT = process.env.PORT || 4000;

// Initialize app
const app = express();

// Pre-requisites 
app.use(express.json());
app.use(cors());
// app.use('/api');
// Server routes
app.use('/contentTypes', contentTypeRouter);


//ping 
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});
// Server running
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});