export class EventBus {
  protected listeners: Record<string, Function[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`события ${event} не существует`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, args: Record<string, any>) {
    if (!this.listeners[event]) {
      throw new Error(`события ${event} не существует`);
    }

    this.listeners[event].forEach((listener) => {
      listener({ ...args });
    });
  }
}
