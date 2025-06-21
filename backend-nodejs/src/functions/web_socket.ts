import mongoose from "mongoose";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import {
  eventInterface,
  saveWebSocketIntoWebSocketsMapInterface,
  toggleUserStatusToOthersToFrontendInterface,
} from "../interfaces/functions/functions.interface";
import User from "../models/user.model";
import { getIdFromToken, isObjectIdValid } from "./general";
import { WebSocket } from "ws";

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

const toggleUserStatusIntoDB = async (
  user: userDocumentInterface["user"],
  is_online: boolean
) => {
  user!.is_online = is_online;
  await user?.save();
};

const saveWebSocketIntoWebSocketsMap = (
  data: saveWebSocketIntoWebSocketsMapInterface
): void => {
  if (!data.websockets_map.get(data.user_id)) {
    data.websockets_map.set(data.user_id, data.websocket);
  }
};

const sendMessage = (ws: WebSocket, event: eventInterface) => {
  ws.send(JSON.stringify(event));
};

const toggleUserStatusToOthersToFrontend = (
  data: toggleUserStatusToOthersToFrontendInterface
): void => {
  data.websockets_map.forEach((websocket: WebSocket, user_id: string) => {
    if (user_id !== data.user_id)
      sendMessage(websocket, {
        event_name: "toggle_user_status",
        from: data.user_id,
        is_online: data.is_online,
      });
  });
};

export {
  getUserFromWebsocketUrl,
  toggleUserStatusIntoDB,
  saveWebSocketIntoWebSocketsMap,
  toggleUserStatusToOthersToFrontend,
};
