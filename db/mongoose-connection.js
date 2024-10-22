import mongoose from 'mongoose';
import '../server-config-import.js'

// MongoDB connection details
const mongoURI = process.env.MONGO_URI;

// Create and export a function to establish the MongoDB connection
async function _mongoDriver() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected successfully:`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// const mongooseDriver = _mongoDriver()

export default _mongoDriver;