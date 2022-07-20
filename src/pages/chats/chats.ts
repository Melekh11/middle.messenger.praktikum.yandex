import Block from "../../utils/core/Block";
import ContactCard from "../../components/contact-card/contact-card";
import { usersData } from "../../components/temporary-user-data";
// @ts-ignore
import { compile } from "pug";
import DialogField from "../../components/dialog-field/dialog-field";
import {TProps} from "../../utils/core/Block";
import "./chats.less";
// @ts-ignore
import chatsTemplate from "./chats.pug";

export default class ChatsPage extends Block {
  constructor(props: TProps) {
    let cardList: ContactCard[] = [];
    for (let user of usersData) {
      cardList.push(new ContactCard(user));
    }
    super("div", {
      ...props,
      dialogChosen: false,
      userListenerId: undefined,
      chatList: cardList,
      dialogField: new DialogField({
        dialogChosen: false,
        userName: "",
        messageFlow: [],
      }),
      // dataIdDialogField: dialogField.id,
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          if (!target){
            return;
          }
          if (target.hasAttribute("contact-id")) {
            // реализация добавления нужного списка чатов
            this.children.dialogField.setProps({
              dialogChosen: true,
            });
          }
        },
      },
    });
  }

  render() {
    return this.compile(chatsTemplate, { isDialog: this.props.isDialog });
  }

  compile(template: string, props: TProps) {
    console.log("compile started");
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = compile(`div(data-id="${child.id}")`)();
    });

    const fragment = this._createDocumentElement("template");

    let readyListOfCards: string[] = [];
    this.props.chatList.forEach((card: Block) => {
      const contactId = card.props.contactId;
      readyListOfCards.push(
        `<div class='user-card' contact-id=${contactId}>` +
          card.getContent().innerHTML.toString() +
          "</div>"
      );
    });
    if (!fragment){
      return;
    }
    console.log(fragment);
    fragment.innerHTML = compile(template)({
      ...propsAndStubs,
      chatList: readyListOfCards,
    });

    Object.values(this.children).forEach((child) => {
      // @ts-ignore
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      stub.replaceWith(child.getContent());
    });
    // @ts-ignore
    console.log(fragment.content, "content");
    console.log("compile ended");
    // @ts-ignore
    return fragment.content;
  }
}
