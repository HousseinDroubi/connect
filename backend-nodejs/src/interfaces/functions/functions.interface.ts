import { WebSocket } from "ws";
import mongoose from "mongoose";

interface moveFileInterface {
  file_source: string;
  file_destination: string;
}

interface saveWebSocketIntoWebSocketsMapInterface {
  user_id: string;
  websocket: WebSocket;
  websockets_map: Map<string, WebSocket>;
}

interface toggleUserStatusToOthersToFrontendInterface
  extends Omit<saveWebSocketIntoWebSocketsMapInterface, "websocket"> {
  is_online: boolean;
}

interface eventInterface {
  event_name:
    | "toggle_user_status"
    | "new_message"
    | "edit_message"
    | "delete_message_for_others";
  from: string;
  is_online?: boolean;
  message?: {
    _id: string;
    is_text: boolean;
    to: string;
    content: string;
  };
}

export {
  moveFileInterface,
  saveWebSocketIntoWebSocketsMapInterface,
  toggleUserStatusToOthersToFrontendInterface,
  eventInterface,
};
