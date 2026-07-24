import dns from "dns";          // 👈 NEW
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});

// 👇 NEW
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

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