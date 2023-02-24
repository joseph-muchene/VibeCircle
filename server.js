import express from "express";
const app = express();
import dotenv from "dotenv";
import connectToDb from "./db/conn.js";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
// routes
import postRoutes from "./routes/Post.route.js";

const DbString = process.env.DBString;

// middlewares
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api", postRoutes);

const PORT = 8000;
connectToDb(DbString, PORT);
app.listen(PORT, () => console.log("listening on Port " + PORT));
