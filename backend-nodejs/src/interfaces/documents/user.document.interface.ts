import mongoose from "mongoose";
import { userModelInterface } from "../model.interface";

interface userDocumentInterface {
  user:
    | (mongoose.Document<unknown, {}, userModelInterface, {}> &
        userModelInterface & {
          _id: mongoose.Types.ObjectId;
        } & {
          __v: number;
        })
    | null;
}

export { userDocumentInterface };
