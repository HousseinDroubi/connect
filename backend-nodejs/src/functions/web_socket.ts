import mongoose from "mongoose";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { saveWebSocketIntoWebSocketsMapInterface } from "../interfaces/functions/functions.interface";
import User from "../models/user.model";
import { getIdFromToken, isObjectIdValid } from "./general";

const getUserFromWebsocketUrl = async (
  request_url: string
): Promise<userDocumentInterface["user"] | null> => {
  const _id = getIdFromToken(`Bearer ${request_url.split("=")[1]}`);
  if (!_id || !isObjectIdValid(_id)) return null;
  const user = await User.findById(_id);
  if (!user) return null;
  if (!user.is_verified || user.deleted_at) return null;
  return user;
};

const toggleUserStatus = async (
  user: userDocumentInterface["user"],
  is_online: boolean
) => {
  user!.is_online = is_online;
  await user?.save();
};

const saveWebSocketIntoWebSocketsMap = (
  data: saveWebSocketIntoWebSocketsMapInterface
): void => {
  if (!data.websocket_map.get(data.user_id)) {
    data.websocket_map.set(data.user_id, data.websocket);
  }
};

export {
  getUserFromWebsocketUrl,
  toggleUserStatus,
  saveWebSocketIntoWebSocketsMap,
};
