import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();

const uri = process.env.MONGO_URI;

// Create a MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export const connectDB = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log("Could not connect to database\n", error)
    }
}

