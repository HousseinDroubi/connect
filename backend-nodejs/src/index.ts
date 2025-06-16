import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route";
import { connectToDB } from "./db/db.connection";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
