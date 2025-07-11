import { queryClient } from "../..";
import { updateUserStatus } from "../ws/ws_requests";

class Singleton {
  private static instance: Singleton;
  private static websocket: WebSocket;

  private constructor(token: string) {
    this.launchWsConnection(token);
    this.launchWsRequests();
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

  public static getInstance(token: string): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(token);
    }
    return Singleton.instance;
  }
}

export default Singleton;
