import { store } from "../utils/core/Store";

export class MessageController {
  private userId: number;
  public socket: WebSocket;

  constructor() {
    const state = store.getState();
    this.userId = state.user.id;
  }

  setConnect(token: string) {
    const chatId = store.getState().currentChat;

    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${this.userId}/${chatId}/${token}`
    );

    this.socket.addEventListener("open", () => {
      console.log("Соединение установлено");

      this.socket.send(
        JSON.stringify({
          content: `первое сообщение ${store.getState().user.first_name}! `,
          type: "message",
        })
      );
    });

    this.socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener("message", async (event) => {
      const messages = store.getState().currentDialog || [];
      const ans = JSON.parse(event.data);
      await store.setState("currentDialog", [...messages, ans]);
      console.log("Получены данные", event.data);
    });

    this.socket.addEventListener("error", (event) => {
      // @ts-ignore
      console.log("Ошибка", event.message);
    });
    return this.socket;
  }

  get getSocket() {
    return this.socket;
  }
}
