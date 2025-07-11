import { queryClient } from "../..";
import wsResponsesInterface from "../../interfaces/services/messages/respones";
import { updateUserStatus } from "../ws/ws_requests";
import { toggleUserStatus } from "../ws/ws_responses";

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
        console.log(data);
        if (data.event_name === "toggle_user_status") {
          toggleUserStatus(data);
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
