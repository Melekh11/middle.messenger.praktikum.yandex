import Block from "../../utils/core/Block";
import Input from "../input/input";
import "./dialog-field.less";
import dialogTemplate from "./dialog-field.pug";
import {TProps} from "../../utils/core/Block";
import connect from "../../utils/core/HOC";
import Button from "../button/button";
import store from "../../utils/core/Store";

class DialogField extends Block {
    constructor(props: TProps) {
        super("div", {
            ...props,
            idChat: props.currentChat,
            dialogChosen: props.dialogChosen,
            inputMessage: new Input({
                inputClass: "index-input-message",
                inputType: "text",
                inputName: "message",
                inputCheckType: "chat",
            }),
            btnSendMessage: new Button({
                className: "index-send-btn", btnText: "→",
                events: {
                    click: () => {
                        const textMessage = (document.querySelector(".index-input-message") as HTMLInputElement).value;
                        const socket = store.getState().socket;
                        socket.send(JSON.stringify({
                            content: textMessage,
                            type: 'message',
                        }));
                    }
                }
            })
        })
        ;
    }

    render() {
        return this.compile(dialogTemplate, this.props);
    }
}

function mapToDialog(store: any) {
    let isDialog: boolean = false;
    if (store.currentChat) {
        isDialog = true;
    }
    return {
        userId: store.user.id,
        dialogChosen: isDialog,
        currentChat: store.curruntChat,
        messageFlow: store.currentDialog || []
    }
}

const con = connect(mapToDialog);
export default con(DialogField);
