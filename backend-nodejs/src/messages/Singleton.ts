class Singleton {
  public static instance: Singleton;

  private constructor() {
    this.launchWebSocket();
  }

  private launchWebSocket(): void {
    console.log("Launching ws");
  }

  public getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
