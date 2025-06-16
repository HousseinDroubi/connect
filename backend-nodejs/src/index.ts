import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/auth.route";

dotenv.config();

const app = express();
app.use(cors());

app.use("/auth", router);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
