import mongoose from "mongoose";
import { tokenModelInterface } from "../interfaces/models/model.interface";

const schema = new mongoose.Schema<tokenModelInterface>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  value: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
    index: { expires: "1h" },
  },
});

const Token = mongoose.model("tokens", schema);
export { Token };
