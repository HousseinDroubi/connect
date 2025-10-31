import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import { userModelInterface } from "../interfaces/models/model.interface";
const schema = new mongoose.Schema<userModelInterface>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: false,
    required: true,
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
  deleted_at: {
    type: Date,
    default: null,
    required: false,
  },
  is_online: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const User = mongoose.model("users", schema);
export default User;
