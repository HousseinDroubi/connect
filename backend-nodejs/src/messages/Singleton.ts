class Singleton {
  private static instance: Singleton;

  private constructor() {
    this.launchWebSocket();
  }

  private launchWebSocket(): void {
    console.log("Launching ws");
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

export default Singleton;
