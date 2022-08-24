import { TProps, Block } from "../../utils/core/Block";
import "./modal-add-chat.less";
import { template as linkModal } from "./modal-add-chat.template";
import { chatsController } from "../../controllers/chats-controller";
import { userController } from "../../controllers/user-controller";
import { Button } from "../button/button";
import { chatsApi } from "../../api/chats-api";
import { store } from "../../utils/core/Store";

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

type ModalAddChatProps = {
  btnCreateChat: Button;
  events: Record<string, any>;
};

export class ModalAddChat extends Block<ModalAddChatProps> {
  constructor(props?: TProps) {
    super("div", {
      ...props,
      btnCreateChat: new Button({
        className: "base-btn",
        btnText: "сохранить!",
        events: {
          click: async () => {
            let labelError = document.querySelector(
              ".modal-error"
            ) as HTMLElement;
            if (labelError) {
              labelError.style.display = "none";
            }
            const titleChat = (
              document.querySelector("#title-chat") as HTMLInputElement
            ).value;
            const loginToInvite = (
              document.querySelector("#login-to-invite") as HTMLInputElement
            ).value;
            const avaChat = document.querySelector(
              "#ava-chat"
            ) as HTMLInputElement;

            if (
              titleChat !== "" &&
              loginToInvite !== "" &&
              avaChat.files?.length !== 0
            ) {
              await userController
                .getByLogin(loginToInvite)
                .then(async (resp) => {
                  const allUsers: IUser[] = resp.response;
                  const users = allUsers.filter((user) => {
                    return user.login === loginToInvite;
                  });
                  let user = users[0];
                  if (!user) {
                    user = allUsers[0];
                  }
                  if (user) {
                    await chatsController
                      .createChat(titleChat)
                      .then(async (chat) => {
                        const chatId = chat.response.id;
                        const users = [user.id];
                        chatsController.addUsers({ users, chatId });

                        const form = new FormData();
                        // @ts-ignore как это сделать чтобы ts не ругался не понимаю
                        form.append(
                          "avatar",
                          // @ts-ignore
                          document.querySelector("#ava-chat")?.files[0]
                        );
                        form.append("chatId", chatId);
                        await chatsApi.addChatAva(form);
                      });
                    await chatsController.getAllChats().then((resp) => {
                      console.log("!!!setted new chats:", resp.response);
                      store.setState("chats", resp.response);
                      console.log("store:", store.getState());
                    });
                    document
                      .querySelector(".modal")
                      ?.classList.remove("active");
                  } else {
                    document
                      .querySelector("#ava-chat")
                      ?.insertAdjacentHTML(
                        "afterend",
                        "<p class='modal-error'>не найден пользователь с данным логином</p>"
                      );
                  }
                });
            } else {
              document
                .querySelector("#ava-chat")
                ?.insertAdjacentHTML(
                  "afterend",
                  "<p class='modal-error'>все поля должны быть заполнены</p>"
                );
            }
          },
        },
      }),
      events: {
        click: (event: Event) => {
          console.log("click on modal", event.target);
          if (event.target === document.querySelector(".modal")) {
            document.querySelector(".modal")?.classList.remove("active");
          }
        },
      },
    });
  }

  render() {
    return this.compile(linkModal, {});
  }
}
