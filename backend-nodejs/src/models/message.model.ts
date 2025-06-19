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
  deleted_for_sender_at: {
    type: Date,
    required: false,
    default: null,
  },
  deleted_for_others_at: {
    type: Date,
    required: false,
    default: null,
  },
  is_text: {
    type: Boolean,
    required: false,
    default: true,
  },
  content: {
    type: String,
    required: false,
  },
  profile_url: {
    type: String,
    required: false,
    default: null,
  },
});

const Message = mongoose.model("messages", schema);
export { Message };
