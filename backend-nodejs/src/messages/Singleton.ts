import { WebSocket } from "ws";
import {
  getUserFromWebsocketUrl,
  saveWebSocketIntoWebSocketsMap,
  toggleUserStatusIntoDB,
  toggleUserStatusToOthersToFrontend,
} from "../functions/web_socket";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { validateNewMessage } from "../validations/ws.validation";
import { isValidObjectId } from "mongoose";
import { newMessageInterface } from "../interfaces/messages/singleton.interface";

class Singleton {
  private static instance: Singleton;
  private static websockets_map = new Map<string, WebSocket>();

  private constructor() {
    this.launchWebSocket();
  }

  private launchWebSocket(): void {
    const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT) });
    wss.on("connection", async (websocket: WebSocket, request: Request) => {
      const user: userDocumentInterface["user"] | null =
        await getUserFromWebsocketUrl(request.url);
      if (!user) return;

      saveWebSocketIntoWebSocketsMap({
        user_id: String(user._id),
        websocket: websocket,
        websockets_map: Singleton.websockets_map,
      });

      await toggleUserStatusIntoDB(user, true);
      toggleUserStatusToOthersToFrontend({
        user_id: String(user._id),
        is_online: true,
        websockets_map: Singleton.websockets_map,
      });

      websocket.on("message", (data) => {
        const new_message: newMessageInterface = JSON.parse(data.toString());
        const error = validateNewMessage(new_message).error?.details[0].message;
        if (error) return;
      });

      websocket.on("close", async () => {
        await toggleUserStatusIntoDB(user, false);
        toggleUserStatusToOthersToFrontend({
          user_id: String(user._id),
          is_online: false,
          websockets_map: Singleton.websockets_map,
        });
        Singleton.websockets_map.delete(String(user._id));
      });
    });
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

export default Singleton;
