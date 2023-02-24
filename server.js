import express from "express";
import dotenv from "dotenv";
import connectToDb from "./db/conn.js";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
const app = express();

const DbString = process.env.DBString;

// middlewares
app.use(cors());
app.use(morgan("dev"));

const PORT = 8000;
connectToDb(DbString, PORT);
app.listen(PORT, () => console.log("listening on Port " + PORT));
