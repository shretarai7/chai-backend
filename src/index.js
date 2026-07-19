import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

const app = express();

console.log("MONGODB_URI:", process.env.MONGODB_URI);

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`✅ Server is running at port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("❌ MongoDB connection failed!", error);
    });