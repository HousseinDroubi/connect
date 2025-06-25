import mongoose from "mongoose";
import { conversationModelInterface } from "../interfaces/models/model.interface";

const schema = new mongoose.Schema<conversationModelInterface>({
  between: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
  last_message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "messages",
  },
  deleted_for: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

const Conversation = mongoose.model("conversations", schema);
export { Conversation };
