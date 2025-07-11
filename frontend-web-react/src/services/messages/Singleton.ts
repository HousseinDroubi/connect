class Singleton {
  private static instance: Singleton;
  private static websocket: WebSocket;

  private constructor(token: string) {
    this.launchWsConnection(token);
  }

  private launchWsConnection(token: string) {
    Singleton.websocket = new WebSocket(
      `${process.env.REACT_APP_API_BASE_URL}?token=${token}`
    );
  }

  public static getInstance(token: string): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(token);
    }
    return Singleton.instance;
  }
}
