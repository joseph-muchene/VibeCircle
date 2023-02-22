import express from "express";
import dotenv from "dotenv";
import connectToDb from "./db/conn.js";
dotenv.config();
const app = express();

const DbString = "mongodb://localhost/VibeCircle";

const PORT = 8000;
connectToDb(DbString, PORT);
app.listen(PORT, () => console.log("listening on Port " + PORT));
