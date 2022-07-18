import Block from "../../utils/core/Block";
import ContactCard from "../../components/contact-card/contact-card";
import {usersData} from "../../components/temporary-user-data"
import {compile} from "pug";
import DialogField from "../../components/dialog-field/dialog-field";
import "./chats.less"
// @ts-ignore
import chatsTemplate from "./chats.pug"

export default class ChatsPage extends Block {
    constructor(props) {
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
                messageFlow: []
            }),
            // dataIdDialogField: dialogField.id,
            events: {
                click: event => {
                    // console.log(1);
                    const target = event.target;
                    if (target.hasAttribute("contact-id")) {
                        // console.log("123")
                        let flow = [];
                        let userName;
                        for (let user of usersData) {
                            if (user.userId === target.getAttribute("contact-id")) {
                                // @ts-ignore
                                flow.push(user.messageFlow)
                            }
                            userName = user.userName;
                        }

                        this.children.dialogField.setProps({
                            dialogChosen: true
                        })
                    }
                }
            }
        });
    }

    render() {
        return this.compile(chatsTemplate, {isDialog: this.props.isDialog});
    }

    compile(template, props) {

        console.log("rerender!!!!");

        const propsAndStubs = {...props};

        Object.entries(this.children).forEach(([key, child]) => {
            // @ts-ignore
            propsAndStubs[key] = compile(`div(data-id="${child.id}")`)();
        });

        const fragment = this._createDocumentElement('template');

        let readyListOfCards: string[] = [];
        this.props.chatList.forEach((card) => {
            const contactId = card.props.contactId;
            readyListOfCards.push(`<div class='user-card' contact-id=${contactId}>` + card.getContent().innerHTML.toString() + "</div>");
            // console.log(card.getContent(), "content!!");
        })
        // console.log(readyListOfCards, "cards");
        fragment.innerHTML = compile(template)({...propsAndStubs, chatList: readyListOfCards});

        Object.values(this.children).forEach((child) => {
            // @ts-ignore
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
            stub.replaceWith(child.getContent());
        });

        return fragment.content;
    }
}