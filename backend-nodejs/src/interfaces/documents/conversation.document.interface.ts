import mongoose from "mongoose";
import { conversationModelInterface } from "../models/model.interface";

interface conversationDocumentInterface {
  conversation:
    | (mongoose.Document<unknown, {}, conversationModelInterface, {}> &
        conversationModelInterface & {
          _id: mongoose.Types.ObjectId;
        } & {
          __v: number;
        })
    | null;
}

export { conversationDocumentInterface };
