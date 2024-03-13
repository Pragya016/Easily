import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
// config dotenv
dotenv.config();
// MongoDB connection URI
const uri = 'mongodb://localhost:27017/Easily-Database';
let client;

// Function to connect to MongoDB
export async function connectToMongoDB() {
    try {
        client = await MongoClient.connect(uri);
        console.log('MongoDB is connected.');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

export async function getDB() {
    return await client.db();
}
