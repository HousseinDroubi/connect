import mongoose from "mongoose";
import { userModelInterface } from "../interfaces/model.interface";
const schema = new mongoose.Schema<userModelInterface>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  pin: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_url: {
    type: String,
    required: true,
  },
  is_verified: {
    type: Boolean,
    required: false,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

const User = mongoose.model("users", schema);
export default User;
