import mongoose from "mongoose";
import { messageModelInterface } from "../interfaces/models/model.interface";

const schema = new mongoose.Schema<messageModelInterface>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
  deleted_for: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  deleted_for_others_at: {
    type: Date,
    required: false,
    default: null,
  },
  is_text: {
    type: Boolean,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conversations",
    required: true,
  },
});

const Message = mongoose.model("messages", schema);
export { Message };
