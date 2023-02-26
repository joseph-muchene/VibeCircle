import express from "express";
const app = express();
import dotenv from "dotenv";
import connectToDb from "./db/conn.js";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
// routes
import postRoutes from "./routes/Post.route.js";
import authRoutes from "./routes/Auth.route.js";
import userRoutes from "./routes/User.Route.js";
const DbString = process.env.DBString;

const PORT = 8000;
connectToDb(DbString, PORT);
// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("*", (req, res) => {
  res.json("Welcome to VibeCircle api");
});

// routes
app.use("/api/v1", postRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

app.listen(PORT, () => console.log("listening on Port " + PORT));
