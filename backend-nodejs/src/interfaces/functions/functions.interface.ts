import { WebSocket } from "ws";
import mongoose from "mongoose";

interface moveFileInterface {
  file_source: string;
  file_destination: string;
}

interface saveWebSocketIntoWebSocketsMapInterface {
  user_id: mongoose.Types.ObjectId;
  websocket: WebSocket;
  websocket_map: Map<mongoose.Types.ObjectId, WebSocket>;
}

export { moveFileInterface, saveWebSocketIntoWebSocketsMapInterface };
