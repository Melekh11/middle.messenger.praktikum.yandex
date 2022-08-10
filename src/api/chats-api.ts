import { BaseApi } from "./base-api";

interface IChat {
  title: string;
}

interface IChatUsers {
  users: number[];
  chatId: number;
}

class ChatsApi extends BaseApi {
  constructor() {
    super({ path: "/chats" });
  }

  public createChat(data: IChat) {
    return this.post("/", {
      data: JSON.stringify(data),
    });
  }

  public deleteChat(data: IChat) {
    return this.delete("/", {
      data: JSON.stringify(data),
    });
  }

  public addUsers(data: IChatUsers) {
    this.put("/users", {
      data: JSON.stringify(data),
    });
  }

  public deleteUsers(data: IChatUsers) {
    return this.delete("/users", {
      data: JSON.stringify(data),
    });
  }

  public addChatAva(data: FormData) {
    this.put("/avatar", {
      data: data,
    });
  }

  public getToken(id: number) {
    return this.post(`/token/${id}`, {
      data: JSON.stringify({}),
    });
  }

  public getAllChats() {
    return this.get("/", {
      data: {},
    });
  }
}

const chatsApi = new ChatsApi();
export { chatsApi, IChat, IChatUsers };
