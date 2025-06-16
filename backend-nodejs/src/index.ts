import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/auth.route";
import { connectToDB } from "./db/db.connection";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", router);

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
