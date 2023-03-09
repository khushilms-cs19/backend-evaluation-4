const express = require('express');
const cors = require('cors');
// Routers


// Constants
const PORT = process.env.PORT || 3000;

// Initialize app
const app = express();

// Pre-requisites 
app.use(express.json());
app.use(cors());

// Server routes


//ping 
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});
// Server running
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});