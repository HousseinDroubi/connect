import { WebSocket } from "ws";

class Singleton {
  private static instance: Singleton;

  private constructor() {
    this.launchWebSocket();
  }

  private launchWebSocket(): void {
    const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT) });
    wss.on("connection", (websocket: WebSocket, request: Request) => {
      console.log("New guest");
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
