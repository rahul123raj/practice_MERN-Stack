const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;
const DB_URI = 'mongodb://localhost:27017/mernstack';

// Middleware
app.use(cors()); // Allow requests from the frontend
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(bodyParser.json()); // Parse JSON data if sent

// MongoDB connection
mongoose
  .connect(DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit if the database connection fails
  });

// Schema
const dataSchema = new mongoose.Schema({
  values: { type: [String], required: true },
});

const DataModel = mongoose.model('Data', dataSchema);

// POST route
app.post('/api/data', async (req, res) => {
  try {
    const { data } = req.body; // Access data sent in the request
    if (!data) {
      return res.status(400).json({ success: false, message: 'No data provided' });
    }

    // Split comma-separated string into an array
    const dataArray = data.split(',').map((item) => item.trim());

    // Save to MongoDB
    const savedData = await DataModel.create({ values: dataArray });

    res.status(200).json({
      success: true,
      message: 'Data stored successfully',
      data: savedData,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
