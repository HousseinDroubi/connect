import { WebSocket } from "ws";
import { getIdFromToken } from "../functions/general";
import { getIdFromWebsocket } from "../functions/web_socket";

class Singleton {
  private static instance: Singleton;

  private constructor() {
    this.launchWebSocket();
  }

  private launchWebSocket(): void {
    const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT) });
    wss.on("connection", (websocket: WebSocket, request: Request) => {
      console.log("New guest");
      const websocket_id: string | null = getIdFromWebsocket(request.url);
      if (!websocket_id) return;

      websocket.on("message", () => {
        console.log("Sending message");
      });
      websocket.on("close", () => {
        console.log("User closed");
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
