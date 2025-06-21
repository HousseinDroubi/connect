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
    // Delete Ws server instance
    const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT) });

    // Listen for connection open in ws
    wss.on("connection", async (websocket: WebSocket, request: Request) => {
      // Get user from url by getting token
      const user: userDocumentInterface["user"] | null =
        await getUserFromWebsocketUrl(request.url);
      if (!user) return;

      // Get user id in map
      saveWebSocketIntoWebSocketsMap({
        user_id: String(user._id),
        websocket: websocket,
        websockets_map: Singleton.websockets_map,
      });

      // Toggle user status to online in DB
      await toggleUserStatusIntoDB(user, true);

      // Toggle user status to online for others in frontend
      toggleUserStatusToOthersToFrontend({
        user_id: String(user._id),
        is_online: true,
        websockets_map: Singleton.websockets_map,
      });

      // Listen for message in ws
      websocket.on("message", async (data) => {
        // Parse message to json
        const new_message: newMessageInterface = JSON.parse(data.toString());

        // Validate message
        const error = validateNewMessage(new_message).error?.details[0].message;
        if (error) return;

        // Validate user id and their existence in DB
        if (!isObjectIdValid(new_message.to)) return;
        if (!(await User.exists({ _id: new_message.to }))) return;

        // Validate image existence if into DB
        if (!new_message.is_text) {
          if (
            !checkFileExistence(
              path.join(__dirname, `../temp/${new_message.content}`)
            )
          )
            return;
        }

        // Create new conversation if not existed
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

        // Create new message
        const message = await Message.create({
          sender: user._id,
          receiver: new mongoose.Types.ObjectId(new_message.to),
          is_text: new_message.is_text,
          content: new_message.content,
          conversation_id: conversation._id,
        });

        // Update conversation last message id
        conversation.last_message = message._id;
        conversation.save();
      });

      // Listen for connection close in ws
      websocket.on("close", async () => {
        // Toggle user status to offline in DB
        await toggleUserStatusIntoDB(user, false);

        // Toggle user status to offline for others in frontend
        toggleUserStatusToOthersToFrontend({
          user_id: String(user._id),
          is_online: false,
          websockets_map: Singleton.websockets_map,
        });

        // Delete user id from map
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
