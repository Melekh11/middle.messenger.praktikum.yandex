import Block from "../../utils/core/Block";
import ContactCard from "../../components/contact-card/contact-card";
import {compile} from "pug";
import DialogField from "../../components/dialog-field/dialog-field";
import {TProps} from "../../utils/core/Block";
import chatsTemplate from "./chats.pug";
import store from "../../utils/core/Store";
import connect from "../../utils/core/HOC";
import Button from "../../components/button/button";
import ModalAddChat from "../../components/modal-add-chat/modal-add-chat";
import chatsController from "../../controllers/chats-controller";
import RoutedLink from "../../components/routed-link/routed-link";
import {routs} from "../../index";
import "./chats.less";
import MessageController from "../../controllers/message-controller";

class ChatsPage extends Block {
    constructor(props: TProps) {
        let cardList: ContactCard[] = [];
        for (let user of store.getState().chats) {
            cardList.push(new ContactCard(user));
        }
        super("div", {
            ...props,
            modalAddChat: new ModalAddChat(),
            linkProfile: new RoutedLink({url: routs.profilePage, className: "tools", linkText: "профиль"}),
            btnAddChat: new Button({
                className: "add-chat", btnText: "",
                events: {
                    click: () => {
                        // @ts-ignore
                        document.querySelector(".modal").classList.add("active");
                    }
                }
            }),
            dialogChosen: false,
            cardList: cardList,
            dialogField: new DialogField({
                dialogChosen: false,
                userName: "",
                messageFlow: [],
            }),
            // dataIdDialogField: dialogField.id,
            events: {
                click: (event: Event) => {
                    // @ts-ignore
                    const userCard = event.target.closest(".user-card")
                    if (userCard) {
                        console.log("smtttt");
                        const idChat: number = userCard.id;
                        chatsController.getChatToken(idChat)
                            .then(resp => {
                                const token: string = resp.response.token;
                                store.setState("currentChat", idChat);
                                store.setState("currentDialog", []);
                                const socket = new MessageController();
                                store.setState("socket", socket.setConnect(token));
                            })

                    }
                },
            },
        });
    }

    render() {
        return this.compile(chatsTemplate, {isDialog: this.props.isDialog});
    }

    compile(template: string, props: TProps) {
        this.props.cardList = [];
        for (let user of store.getState().chats) {
            this.props.cardList.push(new ContactCard(user));
        }
        const propsAndStubs = {...props};

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = compile(`div(data-id="${child.id}")`)();
        });

        const fragment = this._createDocumentElement("template");

        let readyListOfCards: string[] = [];
        this.props.cardList.forEach((card: Block) => {
            const contactId = card.props.idChat;
            readyListOfCards.push(
                `<div class='user-card' id=${contactId}>` +
                card.getContent().innerHTML.toString() +
                "</div>"
            );
        });
        if (!fragment) {
            return;
        }
        console.log(fragment);
        fragment.innerHTML = compile(template)({
            ...propsAndStubs,
            chatList: readyListOfCards,
        });

        Object.values(this.children).forEach((child) => {
            const stub = (fragment as any).content.querySelector(`[data-id="${child.id}"]`);
            stub.replaceWith(child.getContent());
        });
        return (fragment as any).content;
    }
}

function mapToChats(store: any) {
    return {
        cardList: store.chats
    }
}

const con = connect(mapToChats);
export default con(ChatsPage);
