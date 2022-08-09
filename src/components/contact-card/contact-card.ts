import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import "./contact-card.less";
import contCardTemplate from "./contact-card.pug";
import defaultAvaChat from "../../static/img/default-ava-chat.svg"

export default class ContactCard extends Block {
    constructor(props: TProps) {
        if (props.avatar) {
            props.urlIm = "https://ya-praktikum.tech/api/v2/resources/" + props.avatar;
        } else {
            props.urlIm = defaultAvaChat
        }

        super("div", {
            ...props, idChat: props.id
        });
    }

    render() {
        return this.compile(contCardTemplate, {...this.props, idCard: this.props.idChat});
    }

    changeLastWord(newMessage: string) {
        this.setProps({lastMessage: newMessage});
    }
}

// function mapContactCardToProps(state: any) {
//   return {
//     name: state.user.name,
//     avatar: state.user.avatar,
//     lastMessage:
//   };
// }
