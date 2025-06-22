import mongoose from "mongoose";
import { messageModelInterface } from "../models/model.interface";

interface messageDocumentInterface {
  message:
    | (mongoose.Document<unknown, {}, messageModelInterface, {}> &
        messageModelInterface & {
          _id: mongoose.Types.ObjectId;
        } & {
          __v: number;
        })
    | null;
}

export { messageDocumentInterface };
