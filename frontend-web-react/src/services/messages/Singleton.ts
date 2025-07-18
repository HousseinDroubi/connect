import { queryClient } from "../..";
import wsResponsesInterface from "../../interfaces/services/messages/respones";
import { updateUserStatus } from "../ws/ws_requests";
import {
  deleteMessage,
  editMessage,
  receiveNewMessage,
  toggleUserStatus,
} from "../ws/ws_responses";

class Singleton {
  private static instance: Singleton;
  private static websocket: WebSocket;

  private constructor(token: string) {
    this.launchWsConnection(token);
    this.launchWsRequests();
    this.launchWsResponses();
  }

  private launchWsConnection(token: string) {
    Singleton.websocket = new WebSocket(
      `${process.env.REACT_APP_WS_BASE_URL}?token=${token}`
    );
  }

  private launchWsRequests() {
    Singleton.websocket.onopen = () => {
      updateUserStatus(true);
    };
    Singleton.websocket.onclose = () => {
      updateUserStatus(false);
    };
  }

  private launchWsResponses() {
    Singleton.websocket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as wsResponsesInterface;
        switch (data.event_name) {
          case "toggle_user_status":
            toggleUserStatus(data);
            break;
          case "new_message":
            receiveNewMessage(data);
            break;
          case "edit_message":
            editMessage(data);
            break;
          case "delete_message":
            deleteMessage(data);
            break;
        }
      } catch (error) {}
    };
  }

  public static getInstance(token: string): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(token);
    }
    return Singleton.instance;
  }
}

export default Singleton;
