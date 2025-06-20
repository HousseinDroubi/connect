import { WebSocket } from "ws";
import { getUserFromWebsocketUrl } from "../functions/web_socket";
import { userDocumentInterface } from "../interfaces/documents/user.document.interface";

class Singleton {
  private static instance: Singleton;

  private constructor() {
    this.launchWebSocket();
  }

  private launchWebSocket(): void {
    const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT) });
    wss.on("connection", async (websocket: WebSocket, request: Request) => {
      console.log("New guest");
      const user: userDocumentInterface["user"] | null =
        await getUserFromWebsocketUrl(request.url);
      if (!user) return;

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
