import { WebSocket } from "ws";
import {
  findMessageRoute,
  getUserFromWebsocketUrl,
  saveWebSocketIntoWebSocketsMap,
  toggleUserStatusIntoDB,
  toggleUserStatusToOthersToFrontend,
} from "../functions/web_socket";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";
import {
  validateDeleteMessage,
  validateEditMessage,
  validateNewMessage,
  validateNewMessageEventName,
} from "../validations/ws.validation";
import mongoose from "mongoose";
import {
  deleteMessageInterface,
  editMessageInterface,
  newMessageEventNameType,
  newMessageInterface,
} from "../interfaces/messages/singleton.interface";
import { isObjectIdValid } from "../functions/general";
import User from "../models/user.model";
import path from "path";
import {
  checkFileExistence,
  createFolder,
  moveFile,
} from "../functions/server_file_system";
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
        const parsed_data = JSON.parse(data.toString());

        // Get event name from data
        const event_name: newMessageEventNameType = parsed_data.event_name;
        let error =
          validateNewMessageEventName(event_name).error?.details[0].message;

        if (!event_name) return;

        switch (event_name) {
          case "new_message": {
            // ----------------------------- Start of new message case -------------------------------------------

            // Parse message to json
            const new_message: newMessageInterface = parsed_data;

            // Validate message
            error = validateNewMessage(new_message).error?.details[0].message;
            if (error) return;

            // Validate user id and their existence in DB
            if (new_message.to !== null) {
              if (!isObjectIdValid(new_message.to)) return;
              if (!(await User.exists({ _id: new_message.to }))) return;
            }

            // Validate sending message to theirselves
            if (new_message.to === String(user._id)) return;

            // Validate image existence if into DB
            if (!new_message.is_text) {
              if (
                !(await checkFileExistence(
                  path.join(__dirname, `../temp/${new_message.content}`)
                ))
              )
                return;
            }

            // Create new conversation if not existed
            let conversation;
            if (new_message.to !== null) {
              conversation = await Conversation.findOne({
                between: {
                  $all: [new mongoose.Types.ObjectId(new_message.to), user._id],
                },
              });
            } else {
              conversation = await Conversation.findOne({
                between: null,
              });
            }

            if (!conversation && new_message.to === null) return;

            if (!conversation) {
              conversation = await Conversation.create({
                between: [
                  new mongoose.Types.ObjectId(new_message.to),
                  user._id,
                ],
                last_message: null,
              });
            }

            if (!new_message.is_text) {
              await createFolder(
                path.join(__dirname, `../conversations/${conversation._id}`)
              );
              await moveFile({
                file_source: path.join(
                  __dirname,
                  `../temp/${new_message.content}`
                ),
                file_destination: path.join(
                  __dirname,
                  `../conversations/${conversation._id}/${new_message.content}`
                ),
              });
            }

            // Create new message
            const message = await Message.create({
              sender: user._id,
              receiver: new_message.to,
              is_text: new_message.is_text,
              content: new_message.content,
              conversation_id: conversation._id,
            });

            // Update conversation last message id
            conversation.last_message = message._id;
            conversation.save();

            // Send message
            findMessageRoute(
              {
                event_name: "new_message",
                from: String(user._id),
                message: {
                  _id: String(message._id),
                  is_text: message.is_text,
                  to: new_message.to,
                  content: new_message.content,
                  conversation_id: String(conversation._id),
                },
              },
              Singleton.websockets_map,
              new_message.to
            );
            // ----------------------------- End of new message case -------------------------------------------
            break;
          }
          case "edit_message": {
            // ----------------------------- Start of new message case -------------------------------------------
            // Parse message to json
            const edit_message: editMessageInterface = parsed_data;

            // Validate message
            error = validateEditMessage(edit_message).error?.details[0].message;
            if (error) return;

            if (!isObjectIdValid(edit_message.message_id)) return;
            const message = await Message.findById(edit_message.message_id);

            if (!message) return;
            if (message.deleted_for_others_at || message.deleted_for_sender_at)
              return;

            message.content = edit_message.message_new_content;
            await message.save();
            findMessageRoute(
              {
                from: String(user._id),
                event_name: "edit_message",
                message_id: String(message._id),
                message_new_content: edit_message.message_new_content,
              },
              Singleton.websockets_map,
              String(message.receiver)
            );
            // ----------------------------- End of new message case -------------------------------------------
            break;
          }
          case "delete_message":
            // ----------------------------- Start of new message case -------------------------------------------
            // Parse message to json
            const delete_message: deleteMessageInterface = parsed_data;

            // Validate message
            error =
              validateDeleteMessage(delete_message).error?.details[0].message;
            if (error) return;
            if (!isObjectIdValid(delete_message.message_id)) return;
            const message = await Message.findById(delete_message.message_id);
            if (!message) return;
            if (message.deleted_for_others_at || message.deleted_for_sender_at)
              return;

            message.deleted_for_others_at = new Date();
            await message.save();

            findMessageRoute(
              {
                from: String(user._id),
                event_name: "delete_message",
                message_id: String(message._id),
              },
              Singleton.websockets_map,
              String(message.receiver)
            );
          // ----------------------------- End of new message case -------------------------------------------
        }
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
