import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import "./contact-card.less";
// @ts-ignore
import contCardTemplate from "./contact-card.pug";

export default class ContactCard extends Block {
  constructor(props: TProps) {
    super("div", { ...props, contactId: props.userId });
  }

  render() {
    return this.compile(contCardTemplate, this.props);
  }

  changeLastWord(newMessage: string) {
    this.setProps({ lastMessage: newMessage });
  }
}
