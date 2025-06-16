import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = (): void => {
  if (process.env.DATABASE_URL)
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.log(`Error database ${err.message}`);
      });
  else process.exit(1);
};

export { connectToDB };
