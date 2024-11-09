require('dotenv').config();
console.log('Mongo URI:', process.env.MONGO_URI); // Add this line for debugging

const mongoose = require('mongoose');
const app = require('./src/app.js')

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
