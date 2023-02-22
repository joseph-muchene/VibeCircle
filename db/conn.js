import mongoose from "mongoose";

async function connectToDb(DbString, PORT) {
  try {
    await mongoose.connect(DbString, () => {
      console.log("Database connected on port " + PORT);
    });
    mongoose.set("strictQuery", true);
  } catch (error) {
    throw new Error(error);
  }
}

export default connectToDb;
