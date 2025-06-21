import { WebSocket } from "ws";
import mongoose from "mongoose";

interface moveFileInterface {
  file_source: string;
  file_destination: string;
}

interface saveWebSocketIntoWebSocketsMapInterface {
  user_id: string;
  websocket: WebSocket;
  websocket_map: Map<string, WebSocket>;
}

interface toggleUserStatusToOthersToFrontendInterface
  extends Omit<saveWebSocketIntoWebSocketsMapInterface, "websocket"> {
  is_online: boolean;
}

export {
  moveFileInterface,
  saveWebSocketIntoWebSocketsMapInterface,
  toggleUserStatusToOthersToFrontendInterface,
};
