import mongoose from "mongoose";
import { messageModelInterface } from "../interfaces/models/model.interface";

const schema = new mongoose.Schema<messageModelInterface>({
  sender: mongoose.Schema.Types.ObjectId,
  receiver: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
  deleted_for: {
    type: [mongoose.Schema.Types.ObjectId],
    select: false,
  },
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
    required: true,
  },
});

const Message = mongoose.model("messages", schema);
export { Message };
