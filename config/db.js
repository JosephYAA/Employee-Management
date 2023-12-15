const mongoose = require('mongoose');

const url = 'mongodb://mongo:27017/docker-node-mongo';

const connectDb = async () => {
    try {
        await mongoose.connect(url);
          console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the Node.js process with an error code
      }
};

module.exports = connectDb;