import { WebSocket } from "ws";
import {
  getUserFromWebsocketUrl,
  saveWebSocketIntoWebSocketsMap,
  toggleUserStatusIntoDB,
  toggleUserStatusToOthersToFrontend,
} from "../functions/web_socket";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import { validateNewMessage } from "../validations/ws.validation";
import mongoose, { isValidObjectId } from "mongoose";
import { newMessageInterface } from "../interfaces/messages/singleton.interface";
import { isObjectIdValid } from "../functions/general";
import User from "../models/user.model";
import path from "path";
import { checkFileExistence } from "../functions/server_file_system";
import { Message } from "../models/message.model";
import { Conversation } from "../models/conversation.model";

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

      websocket.on("message", async (data) => {
        const new_message: newMessageInterface = JSON.parse(data.toString());
        const error = validateNewMessage(new_message).error?.details[0].message;

        if (!isObjectIdValid(new_message.to)) return;
        if (!(await User.exists({ _id: new_message.to }))) return;

        if (!new_message.is_text) {
          if (
            !checkFileExistence(
              path.join(__dirname, `../temp/${new_message.content}`)
            )
          )
            return;
        }

        let conversation = await Conversation.findOne({
          between: {
            $all: [new mongoose.Types.ObjectId(new_message.to), user._id],
          },
        });

        if (!conversation) {
          conversation = await Conversation.create({
            between: [new mongoose.Types.ObjectId(new_message.to), user._id],
            last_message: null,
          });
        }

        const message = await Message.create({
          sender: user._id,
          receiver: new mongoose.Types.ObjectId(new_message.to),
          is_text: new_message.is_text,
          content: new_message.content,
          conversation_id: conversation._id,
        });
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
