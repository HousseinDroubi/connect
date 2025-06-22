import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route";
import mesrsageRoutes from "./routes/message.route";
import conversationRoutes from "./routes/conversation.route";
import { connectToDB } from "./db/db.connection";
import Singleton from "./messages/Singleton";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/message", mesrsageRoutes);
app.use("/conversation", conversationRoutes);

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

Singleton.getInstance();
